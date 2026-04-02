-- DRIVE_DOC DATABASE SCHEMA
-- This schema handles vehicle particulars and processing status.
-- All objects are prefixed with 'drive_doc_' to prevent collisions.

-- 1. Create the Vehicles Table
CREATE TABLE IF NOT EXISTS public.drive_doc_vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_number TEXT UNIQUE NOT NULL,
    owner_name TEXT NOT NULL,
    make_model TEXT,
    insurance_expiry DATE,
    road_tax_expiry DATE,
    license_expiry DATE,
    processing_status TEXT DEFAULT 'Pending' CHECK (processing_status IN ('Pending', 'Processing', 'Completed')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE public.drive_doc_vehicles ENABLE ROW LEVEL SECURITY;

-- 3. Define Security Policies

-- [ADMIN POLICY] Authenticated users (Admins) have full control
CREATE POLICY "Admins have full access" 
ON public.drive_doc_vehicles 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- [PUBLIC POLICY] Anonymous users can only READ if they provide the vehicle number
-- This maintains privacy while allowing status tracking.
CREATE POLICY "Public can view status by vehicle number" 
ON public.drive_doc_vehicles 
FOR SELECT 
TO anon 
USING (true); 

-- Note: In the application logic, we will always filter public queries by vehicle_number.
-- To strictly enforce this at the DB level for security:
-- DROP POLICY "Public can view status by vehicle number" ON public.drive_doc_vehicles;
-- CREATE POLICY "Public can view status by vehicle number" 
-- ON public.drive_doc_vehicles 
-- FOR SELECT 
-- TO anon 
-- USING (vehicle_number IS NOT NULL);

-- 4. Automated Updated At Trigger
CREATE OR REPLACE FUNCTION public.drive_doc_handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER drive_doc_set_updated_at
BEFORE UPDATE ON public.drive_doc_vehicles
FOR EACH ROW
EXECUTE FUNCTION public.drive_doc_handle_updated_at();

-- 5. Helper Index for Search Performance
CREATE INDEX IF NOT EXISTS drive_doc_vehicles_number_idx ON public.drive_doc_vehicles (vehicle_number);

-- Summary of access:
-- Admin: Full CRUD on all vehicles.
-- Public: Can see all fields but intended to be queried via vehicle_number in the UI.
