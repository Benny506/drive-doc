import { supabase } from '../supabase/supabaseClient'

/**
 * Service for interacting with the 'drive_doc_vehicles' table.
 */
export const fetchVehicles = async () => {
    const { data, error } = await supabase
        .from('drive_doc_vehicles')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

export const addVehicle = async (vehicleData) => {
    const { data, error } = await supabase
        .from('drive_doc_vehicles')
        .insert([vehicleData])
        .select()

    if (error) throw error
    return data[0]
}

export const updateVehicle = async (id, updates) => {
    const { data, error } = await supabase
        .from('drive_doc_vehicles')
        .update(updates)
        .eq('id', id)
        .select()

    if (error) throw error
    return data[0]
}

export const deleteVehicle = async (id) => {
    const { error } = await supabase
        .from('drive_doc_vehicles')
        .delete()
        .eq('id', id)

    if (error) throw error
    return true
}

export const findVehicleByNumber = async (vehicleNumber) => {
    const { data, error } = await supabase
        .from('drive_doc_vehicles')
        .select('*')
        .ilike('vehicle_number', vehicleNumber)
        .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 is 'no rows returned'
    return data
}

export const subscribeToVehicles = (onUpdate) => {
    return supabase
        .channel('drive_doc_vehicles_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'drive_doc_vehicles' }, onUpdate)
        .subscribe()
}
