import { supabase } from "../supabase-client/index.js";

export default async function fetchData() {
  try {
    let { data: projects, error } = await supabase.from("projects").select("*");
    return projects;
  } catch (e) {
    throw e;
  }
}

export async function fetchTasks(project_id) {
  try {
    let { data: tasks, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("project_id", `${project_id}`);
    return tasks;
  } catch (e) {
    throw e;
  }
}

export async function fetchAllTasks() {
  try {
    let { data: tasks, error } = await supabase.from("tasks").select("*");
    return tasks;
  } catch (e) {
    throw e;
  }
}

export async function createProject(
  projectName,
  projectDueDate,
  projectDescription,
) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          project_name: `${projectName}`,
          project_due_date: `${projectDueDate}`,
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
    throw e;
  }
}

export async function deleteProject(projectId) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .delete()
      .eq("project_id", `${projectId}`);
  } catch (e) {
    throw e;
  }
}

export async function createTask(taskName, projectName) {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          task_name: `${taskName}`,
          project_id: `${projectName}`,
        },
      ])
      .select()
      .single();
    return data;
  } catch (e) {
    throw e;
  }
}

export async function updateTaskStatus(taskId, projectId, status) {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .update({ task_status: `${status}` })
      .eq("task_id", `${taskId}`)
      .eq("project_id", `${projectId}`)
      .select();
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteTask(taskId, projectId) {
  try {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("task_id", `${taskId}`)
      .eq("project_id", `${projectId}`);
  } catch (e) {
    throw e;
  }
}

export async function deleteAllCompletedTasks(projectId) {
  try {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("project_id", `${projectId}`)
      .eq("task_status", "completed");
  } catch (e) {
    throw e;
  }
}

export async function deleteAllTasksFromProject(projectId) {
  try {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("project_id", `${projectId}`);
  } catch (e) {
    throw e;
  }
}

let activeProjectsChannels = new Set();
let activeTasksChannels = new Set();

export async function subscribeToProjects(userId, onEvent) {
  if (!userId) return null;

  cleanupUserChannels(userId);

  const channelName = `projects-${userId}-${Date.now()}`;

  const channel = supabase
    .channel(channelName)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "projects",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        console.log(
          `Realtime event on channel ${channelName}:`,
          payload.eventType,
          payload,
        );
        if (onEvent) {
          onEvent(payload);
        }
      },
    )
    .subscribe((status) => {
      console.log(`Subscription ${channelName} status:`, status);
    });

  activeProjectsChannels.add(channel);
  return channel;
}

export function cleanupUserChannels(userId) {
  if (!userId) return;

  const channelsToRemove = Array.from(activeProjectsChannels).filter(
    (channel) => channel.topic.includes(`projects-${userId}`),
  );

  channelsToRemove.forEach((channel) => {
    supabase.removeChannel(channel);
    activeProjectsChannels.delete(channel);
  });
}

export function forceCleanupAllChannels() {
  const allChannels = supabase.getChannels();

  allChannels.forEach((channel) => {
    if (
      channel.topic.includes("projects-") ||
      channel.topic.includes("tasks-")
    ) {
      supabase.removeChannel(channel);
    }
  });

  activeProjectsChannels.clear();
  activeTasksChannels.clear();
}

export async function subscribeToTasks(userId, onEvent) {
  if (!userId) return null;

  cleanupUserTasksChannels(userId);

  const channelName = `tasks-${userId}-${Date.now()}`;

  const channel = supabase
    .channel(channelName)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "tasks",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        console.log(
          `Realtime event on channel ${channelName}:`,
          payload.eventType,
          payload,
        );
        if (onEvent) {
          onEvent(payload);
        }
      },
    )
    .subscribe((status) => {
      console.log(`Subscription ${channelName} status:`, status);
    });

  activeTasksChannels.add(channel);
  return channel;
}

export function cleanupUserTasksChannels(userId) {
  if (!userId) return;

  Array.from(activeTasksChannels).forEach((channel) => {
    if (channel.topic.includes(`tasks-${userId}`)) {
      supabase.removeChannel(channel);
      activeTasksChannels.delete(channel);
    }
  });
}

export function cleanupAllChannels() {
  activeProjectsChannels.forEach((channel) => supabase.removeChannel(channel));
  activeTasksChannels.forEach((channel) => supabase.removeChannel(channel));
  activeProjectsChannels.clear();
  activeTasksChannels.clear();
}
