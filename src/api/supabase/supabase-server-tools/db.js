import { supabaseClient } from "../../server/server.mjs";

export async function createProject(
  projectName,
  projectDueDate,
  projectDescription,
) {
  try {
    const { data, error } = await supabaseClient
      .from("projects")
      .insert([
        {
          project_name: `${projectName}`,
          project_due_date: new Date(projectDueDate)
            .toISOString()
            .split("T")[0],
          project_description:
            projectDescription.trim().length === 0
              ? null
              : `${projectDescription}`,
        },
      ])
      .select()
      .single();
    return data;
  } catch (e) {
    console.error("Error:", e);
  }
}

async function resolveProjectIdByName(projectName) {
  try {
    let { data: projectIdArr, error } = await supabaseClient
      .from("projects")
      .select("project_id")
      .eq("project_name", `${projectName}`);
    return projectIdArr[0].project_id;
  } catch (e) {
    throw e;
  }
}

export async function createTaskWithResolvingProjectName(
  taskName,
  projectName,
) {
  try {
    const { data, error } = await resolveProjectIdByName(projectName).then(
      (outerData) => createTask(taskName, outerData),
    );
    return data;
  } catch (e) {
    throw e;
  }
}

async function createTask(taskName, projectId) {
  try {
    const result = await supabaseClient
      .from("tasks")
      .insert([
        {
          task_name: `${taskName}`,
          project_id: `${projectId}`,
        },
      ])
      .select()
      .single();
    return result;
  } catch (e) {
    throw e;
  }
}

export async function updateTaskStatusByName(projectName, taskName, status) {
  try {
    const data = await fetchTaskIdByName(projectName, taskName).then((data) => {
      return supabaseClient
        .from("tasks")
        .update({ task_status: `${status}` })
        .eq("task_id", `${data}`)
        .select();
    });
    return data;
  } catch (e) {
    throw e;
  }
}

async function fetchTaskIdByName(projectName, taskName) {
  try {
    const taskArr = await resolveProjectIdByName(projectName).then(
      (projectId) => fetchTasksByName(projectId, taskName),
    );
    return taskArr[0]?.task_id ?? taskArr?.task_id;
  } catch (e) {
    throw e;
  }
}

async function fetchTasksByName(projectId, taskName) {
  try {
    let { data: tasks, error } = await supabaseClient
      .from("tasks")
      .select("*")
      .eq("project_id", `${projectId}`)
      .eq("task_name", `${taskName}`);
    return tasks;
  } catch (e) {
    throw e;
  }
}
