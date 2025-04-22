'use client';

import { useEffect, useState } from 'react';
import { createSupabaseClient } from '@/lib/supabase/client';
import { type SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

export function useSupabase() {
  const [supabase] = useState<SupabaseClient<Database>>(() => createSupabaseClient());
  
  return { supabase };
}

export function useSession() {
  const { supabase } = useSupabase();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return { session, loading, supabase };
}