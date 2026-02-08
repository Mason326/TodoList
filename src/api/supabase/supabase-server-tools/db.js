import { supabaseClient } from "../../server/server.mjs";

export async function createProject(
  projectName,
  projectDueDate,
  projectDescription,
) {
  try {
    console.log(supabaseClient);
    const { data, error } = await supabaseClient
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
    console.log("done");
  } catch (e) {
    console.error("Error:", e);
  }
}
