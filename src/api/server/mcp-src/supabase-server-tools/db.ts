import { supabaseClient } from "../mcp";
import { ITask } from "../interfaces/interface.js";
import { log } from "../mcp";

export async function createProject(
  projectName: string,
  projectDueDate: string,
  projectDescription: string,
) {
  try {
    if (!supabaseClient) return;
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
    log("create_project data result", JSON.stringify(data));
    return data;
  } catch (e) {
    console.error("Error:", e);
    log("create_project error", JSON.stringify(e));
  }
}

async function resolveProjectIdByName(
  projectName: string,
): Promise<string | undefined> {
  try {
    if (!supabaseClient) return;
    let { data: projectIdArr, error } = await supabaseClient
      .from("projects")
      .select("project_id")
      .eq("project_name", `${projectName}`);
    if (!projectIdArr) return;
    return projectIdArr[0].project_id;
  } catch (e) {
    throw e;
  }
}

export async function createTaskWithResolvingProjectName(
  taskName: string,
  projectName: string,
): Promise<ITask | undefined> {
  try {
    const task = await resolveProjectIdByName(projectName).then((outerData) =>
      createTask(taskName, outerData!!),
    );
    return task;
  } catch (e) {
    throw e;
  }
}

async function createTask(
  taskName: string,
  projectId: string,
): Promise<ITask | undefined> {
  try {
    if (!supabaseClient) return;
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
    return result.data as ITask;
  } catch (e) {
    throw e;
  }
}

export async function updateTaskStatusByName(
  projectName: string,
  taskName: string,
  status: string,
) {
  try {
    const data = await fetchTaskIdByName(projectName, taskName).then((data) => {
      if (!supabaseClient) return;
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

async function fetchTaskIdByName(projectName: string, taskName: string) {
  try {
    const taskArr = await resolveProjectIdByName(projectName).then(
      (projectId) => fetchTasksByName(projectId || "", taskName),
    );
    if (!taskArr) return;
    return taskArr[0]?.task_id;
  } catch (e) {
    throw e;
  }
}

async function fetchTasksByName(projectId: string, taskName: string) {
  try {
    if (!supabaseClient) return;
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

export async function deleteTaskByName(projectName: string, taskName: string) {
  try {
    const deleteResult = await fetchTaskIdByName(projectName, taskName).then(
      (taskId) => {
        if (!supabaseClient) return;

        return supabaseClient
          .from("tasks")
          .delete()
          .eq("task_id", `${taskId}`)
          .select();
      },
    );
    return deleteResult;
  } catch (e) {
    throw e;
  }
}

export async function deleteAllCompletedTasks(projectName: string) {
  try {
    if (!supabaseClient) return;
    const deleteResult = await resolveProjectIdByName(projectName).then(
      (projectId) => {
        if (!supabaseClient) return;
        return supabaseClient
          .from("tasks")
          .delete()
          .eq("project_id", `${projectId}`)
          .eq("task_status", "completed")
          .select();
      },
    );
    return deleteResult;
  } catch (e) {
    throw e;
  }
}

export async function deleteProjectByName(projectName: string) {
  try {
    let projectIdHolder: string | undefined;
    const deleteResult = await resolveProjectIdByName(projectName)
      .then((projectId) => {
        projectIdHolder = projectId;
        console.log(projectIdHolder);
        return deleteAllTasksFromProjectByName(projectId || "");
      })
      .then(() => {
        if (!supabaseClient) return;
        console.log(supabaseClient);
        return supabaseClient
          .from("projects")
          .delete()
          .eq("project_id", `${projectIdHolder}`)
          .select();
      });
    console.log(deleteResult);
    return deleteResult;
  } catch (e) {
    throw e;
  }
}

async function deleteAllTasksFromProjectByName(projectId: string) {
  try {
    if (!supabaseClient) return;
    const { error } = await supabaseClient
      .from("tasks")
      .delete()
      .eq("project_id", `${projectId}`);
  } catch (e) {
    throw e;
  }
}
