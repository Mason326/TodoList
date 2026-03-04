import { supabase } from "../supabase/supabase-client";

export async function fetchMessages() {
  try {
    let { data: messages, error } = await supabase.from("messages").select("*");
    return messages;
  } catch (e) {
    throw e;
  }
}

export async function createMessage(messageContent, messageOwner) {
  try {
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          message_content: `${messageContent}`,
          message_owner: `${messageOwner}`,
        },
      ])
      .select();
  } catch (e) {
    throw e;
  }
}

export async function createAttachmentWithId(attachmentId, fileName) {
  try {
    const { data, error } = await supabase
      .from("attachments")
      .insert([
        {
          attachment_id: `${attachmentId}`,
          file_id: `${fileName}`,
        },
      ])
      .select();
    console.log(error);
    console.log(data);
    if (error) return error;

    return data;
  } catch (e) {
    throw e;
  }
}

export async function createAttachment(fileName) {
  try {
    const { data, error } = await supabase
      .from("attachments")
      .insert([
        {
          file_id: `${fileName}`,
        },
      ])
      .select();
    console.log(error);
    console.log(data);
    if (error) return error;

    return data;
  } catch (e) {
    throw e;
  }
}
