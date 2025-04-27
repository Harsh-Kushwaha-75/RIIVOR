import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchProducts() {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return data;
}

// Sign up with email and password
export async function signUp(
  email: string,
  password: string,
  address: string,
  mobileNo: string
) {
  // First create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
      data: {
        address,
        mobile_no: mobileNo
      }
    }
  });

  if (authError) throw authError;

  // Send OTP email using Supabase Edge Functions
  const { error: otpError } = await supabase.functions.invoke('send-otp-email', {
    body: {
      to: email,
      from: 'riivor01@gmail.com',
      subject: 'Verify your RIIVOR account',
      userDetails: {
        email,
        address,
        mobileNo
      }
    }
  });

  if (otpError) throw otpError;

  return authData;
}

// Sign in with email and password
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export { supabase };