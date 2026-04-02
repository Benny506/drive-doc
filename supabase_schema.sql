-- Drivers/Vehicles table
CREATE TABLE public.vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_number TEXT UNIQUE NOT NULL,      -- e.g., ABC-1234
    owner_name TEXT NOT NULL,
    make_model TEXT NOT NULL,
    insurance_expiry DATE NOT NULL,
    road_tax_expiry DATE NOT NULL,
    driver_license_expiry DATE,
    processing_status TEXT DEFAULT 'Pending', -- Pending, Processing, Completed
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Public Policy: Allow anyone to read basic info by vehicle_number
CREATE POLICY "Public Read Access" 
ON public.vehicles 
FOR SELECT 
USING (true); -- We'll filter by vehicle_number in the app for security

-- Admin Policy: Allow full access to authenticated users (Admins)
CREATE POLICY "Admin Full Access" 
ON public.vehicles 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.vehicles
FOR EACH ROW
EXECUTE FUNCTION handle_updated_at();
