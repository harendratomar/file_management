import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment ");
  console.error("supabaseUrl:", supabaseUrl);
  console.error("supabaseAnonKey:", supabaseAnonKey ? "EXISTS" : "MISSING");
}

export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);

export const STORAGE_BUCKET = "uploads";

export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey);
}