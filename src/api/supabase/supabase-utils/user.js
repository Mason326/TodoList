import { supabase } from "../supabase-client";

export async function signUpWithEmailAndPassword(
  promptEmail,
  promptPassword,
  uname,
) {
  try {
    let { data, error } = await supabase.auth.signUp({
      email: promptEmail,
      password: promptPassword,
      options: {
        data: {
          user_name: uname,
        },
      },
    });

    if (error) throw error;

    return data;
  } catch (e) {
    throw e;
  }
}

export async function signInWithEmailAndPassword(promptEmail, promptPassword) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: promptEmail,
      password: promptPassword,
    });
    if (error) throw error;

    return data;
  } catch (e) {
    throw e;
  }
}

export async function signOutMethod() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (e) {
    throw e;
  }
}

export async function sendResetRequest(email) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/passwordReset",
    });
  } catch (e) {
    console.log(e);
  }
}

export async function updateUserPassword(inpPassword) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: inpPassword,
    });
    console.log(data);
  } catch (e) {
    throw e;
  }
}
