import { useEffect } from 'react';
import { supabase } from '../supabaseClient';

export function useSupabaseSync(user, dark, history, setDark, setHistory) {
  // 1. Încarcă datele când userul se loghează
  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setDark(data.dark_mode);
          setHistory(data.search_history || []);
        }
      };
      fetchProfile();
    }
  }, [user, setDark, setHistory]);

  // 2. Salvează datele automat când se schimbă (Debounced sau Direct)
  useEffect(() => {
    if (user) {
      const saveProfile = async () => {
        await supabase.from('profiles').upsert({
          id: user.id,
          dark_mode: dark,
          search_history: history,
          updated_at: new Date()
        });
      };
      saveProfile();
    }
  }, [dark, history, user]);
}