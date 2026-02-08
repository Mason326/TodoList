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
