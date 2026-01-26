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

export async function createProject(projectName, projectDueDate, projectDescription, user_id) {
   try { 
      const { data, error } = await supabase
        .from('projects')
        .insert([
            { project_name: `${projectName}`, project_created_at: `${new Date().toISOString().split('T')[0]}`, project_due_date: `${projectDueDate}`, project_description: `${projectDescription}`, user_id: `${user_id}`},
        ])
        .select()
        .single()
        return data
    }
    catch(e) {
        throw e;
    }    
}

export async function createTask(taskName, projectName, user_id) {
   try { 
        const { data, error } = await supabase
         .from('tasks')
         .insert([
            { task_name: `${taskName}`, task_created_at: `${new Date().toISOString().split('T')[0]}`, project_id: `${projectName}`, user_id: `${user_id}`  },
         ])
         .select()
         .single()
         return data
    }
    catch(e) {
        throw e;
    }    
}

export async function updateTaskStatus(taskId, projectId, user_id, status) {
   try { 
        const { data, error } = await supabase
        .from('tasks')
        .update({ is_completed: `${status}` })
        .eq('task_id', `${taskId}`)
        .eq('project_id', `${projectId}`)
        .eq('user_id', `${user_id}`)
        .select()
        return data
    }
    catch(e) {
        throw e;
    }    
}

export async function deleteTask(taskId, projectId) {
   try {         
        const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('task_id', `${taskId}`)
        .eq('project_id', `${projectId}`)
    }
    catch(e) {
        throw e;
    }    
}
