import { supabase } from '@/integrations/supabase/client';

export interface CreateCollegeData {
  name: string;
  location?: string;
  code?: string;
  adminUserId?: string;
}

export const collegeService = {
  async createCollege({ name, location, code, adminUserId }: CreateCollegeData) {
    try {
      const { data, error } = await supabase
        .from('colleges')
        .insert({
          name,
          location,
          code,
          admin_user_id: adminUserId
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },

  async getColleges() {
    try {
      const { data, error } = await supabase
        .from('colleges')
        .select('*')
        .order('name');

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error: any) {
      return { data: [], error };
    }
  },

  async getCollegeById(id: string) {
    try {
      const { data, error } = await supabase
        .from('colleges')
        .select(`
          *,
          placement_data (*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },

  async updateCollege(id: string, updates: Partial<CreateCollegeData>) {
    try {
      const { data, error } = await supabase
        .from('colleges')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  }
};