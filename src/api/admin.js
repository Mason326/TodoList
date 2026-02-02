// import { createClient } from '@supabase/supabase-js'

// const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SERVICE_ROLE_KEY, {
//   auth: {
//     autoRefreshToken: false,
//     persistSession: false
//   }
// })
// const adminAuthClient = supabase.auth.admin

export async function fetchUsers() {
    try {
        const { data: { users }, error } = await adminAuthClient.listUsers();
        return users
    }
    catch(e) {
        throw e;
    }
}

export async function fetchAdmins() {
     try {
        const { data, error } = await supabase
        .from('admins')
        .select()
        return data;
    }
    catch(e) {
        throw e;
    }    
}

export async function createUser(uname, email, inpPassword, isAdmin) {
  try {
    if(isAdmin) {
      const { data, error } = await adminAuthClient.createUser({
        email: email,
        password: inpPassword,
        email_confirm: true,
        user_metadata: { user_name: uname, isAdmin: true }
      })
      const { insertError } = await supabase
        .from('admins')
        .insert({ user_id: data.user.id })
        }
    else {
      const { data, error } = await adminAuthClient.createUser({
        email: email,
        password: inpPassword,
        email_confirm: true,
        user_metadata: { user_name: uname}
      })
    }
  }
  catch(e) {
    throw e;
  }
}

