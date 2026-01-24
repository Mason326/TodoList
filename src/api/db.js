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

export async function fetchTasks(project_id) {
   try { 
      let { data: tasks, error } = await supabase
        .from('tasks')
        .select("*")
        .eq('project_id', `${project_id}`)
        return tasks
    }
    catch(e) {
        throw e;
    }    
}