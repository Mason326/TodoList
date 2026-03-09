import { supabase } from "../supabase/supabase-client";

export async function fetchMessages() {
  try {
    let { data: messages, error } = await supabase.from("messages").select("*");
    return messages;
  } catch (e) {
    throw e;
  }
}

export async function createMessage(
  messageContent,
  messageOwner,
  uploadedFiles,
) {
  try {
    const arrFiles = uploadedFiles.map((item) =>
      JSON.stringify({
        displayName: item.displayName,
        filePath: item.filePath,
      }),
    );
    console.log(arrFiles);
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          message_content: `${messageContent}`,
          message_owner: `${messageOwner}`,
          attachments: arrFiles ?? null,
        },
      ])
      .select();
    return data;
  } catch (e) {
    throw e;
  }
}
