import {supabase} from "../supabase";


export default async function fetchData() {
    try { 
        let { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        return projects
    }
    catch(e) {
        throw e;
    }    
}

