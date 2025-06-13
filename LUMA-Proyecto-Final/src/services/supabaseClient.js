import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// const {supabaseUrl, supabaseAnonKey}  = Constants.expoConfig.extra;
let supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoeGJ4emFqZWxidmdkbmhhYWh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMDQxNTksImV4cCI6MjA2MzU4MDE1OX0.GVG6QJ3aJfY_EwJYAceL-Xfs5i307lg0ibXnxrWQjkM";
let supabaseUrl = "https://zhxbxzajelbvgdnhaahz.supabase.co"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

