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
    resolveProjectIdByName(projectName).then((outerData) => {
      createTask(taskName, outerData).then((innerData) => {
        return innerData;
      });
    });
  } catch (e) {
    throw e;
  }
}

async function createTask(taskName, projectId) {
  try {
    const { data, error } = await supabaseClient
      .from("tasks")
      .insert([
        {
          task_name: `${taskName}`,
          project_id: `${projectId}`,
        },
      ])
      .select()
      .single();
    return data;
  } catch (e) {
    throw e;
  }
}
