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

export async function createProject(projectName, projectDueDate, projectDescription) {
   try { 
      const { data, error } = await supabase
        .from('projects')
        .insert([
            { project_name: `${projectName}`, project_created_at: new Date().toISOString().split('T')[0], project_due_date: `${projectDueDate}`, project_description: `${projectDescription}`},
        ])
        .select()
    }
    catch(e) {
        throw e;
    }    
}