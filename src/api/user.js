//import {supabase} from "../supabase";

//const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
//export const LOCAL_STORAGE_USER_KEY = `sb-${SUPABASE_URL.split('://')[1].split(":")[0]}-auth-token`;

export async function signUpWithEmailAndPassword(promptEmail, promptPassword, uname) {
    // try
    // {
    //     const { data, error } = await supabase.auth.signUp({
    //         email: promptEmail,
    //         password: promptPassword,
    //         options: {
    //             data: {
    //               user_name: uname
    //             }
    //         }
    //     })
        
    //     if(error) throw error;

    //     return data;
    // }
    // catch(e) {
    //     throw e;
    // } 
}

export async function isAdmin(check_uid) {
    try {
        const { data, error } = await supabase
        .from('admins')
        .select()
        .eq('user_id', `${check_uid}`);
        if(data.length !== 0)
            return true;            
        return false
    }
    catch(e) {
        return false;
    }
}


export async function signInWithEmailAndPassword(promptEmail, promptPassword) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: promptEmail,
            password: promptPassword,
          })
          if(error) throw error;

          if(await isAdmin(data.user.id)) {
            const obj = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY));
            obj.user.user_metadata.isAdmin = true;
            localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(obj));
            data.user.user_metadata.isAdmin = true;
            return data;
        }
        return data;
    }
    catch(e) {
        throw e;
    }  
}




export async function signOutMethod() {
    try {
        const { error } = await supabase.auth.signOut()
        if(error) throw error;
    }
    catch(e) {
        throw e;
    }  
}



export async function sendResetRequest(email) {
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:5173/passwordReset',
        })  
    }
    catch(e) {
        console.log(e);   
    }
}


export async function updateUserPassword(inpPassword) {
    try {
        const { data, error } = await supabase.auth.updateUser({
            password: inpPassword
        })
        console.log(data);
    }
    catch(e) {
        throw e;
    }
}