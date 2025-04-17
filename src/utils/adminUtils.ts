
import { supabase } from '@/integrations/supabase/client';

/**
 * Makes a user an admin by adding an admin role in the user_roles table
 * This utility is meant to be used in the console for debugging purposes
 */
export const makeUserAdmin = async (userId: string): Promise<boolean> => {
  console.log('Making user an admin:', userId);
  try {
    // First, check if the user already has an admin role
    const { data: existingRole, error: fetchError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();
    
    if (fetchError) {
      console.error('Error checking admin role:', fetchError);
      return false;
    }
    
    if (existingRole) {
      console.log('User is already an admin');
      return true;
    }
    
    // Insert admin role
    const { data, error } = await supabase
      .from('user_roles')
      .insert([
        { user_id: userId, role: 'admin' }
      ]);
    
    if (error) {
      console.error('Error making user admin:', error);
      return false;
    }
    
    console.log('Successfully made user an admin');
    return true;
  } catch (error) {
    console.error('Exception making user admin:', error);
    return false;
  }
};

/**
 * Instructions for making a user an admin:
 * 
 * 1. Import the makeUserAdmin function in your browser console:
 *    const makeAdmin = await import('/src/utils/adminUtils.js').then(mod => mod.makeUserAdmin);
 * 
 * 2. Get the current user ID:
 *    const userId = (await window.supabase.auth.getSession()).data.session.user.id;
 * 
 * 3. Make the user an admin:
 *    await makeAdmin(userId);
 * 
 * 4. Refresh the page to update the authentication state.
 */
