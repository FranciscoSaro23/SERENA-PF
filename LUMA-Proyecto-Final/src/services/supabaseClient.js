import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://zhxbxzajelbvgdnhaahz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoeGJ4emFqZWxidmdkbmhhYWh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMDQxNTksImV4cCI6MjA2MzU4MDE1OX0.GVG6QJ3aJfY_EwJYAceL-Xfs5i307lg0ibXnxrWQjkM';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

