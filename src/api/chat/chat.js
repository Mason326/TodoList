import { supabase } from "../../supabase";

export async function fetchMessages() {
  try {
    let { data: messages, error } = await supabase.from("messages").select("*");
    return messages;
  } catch (e) {
    throw e;
  }
}

export async function createMessage(messageContent, messageOwner, userId) {
  try {
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          message_content: `${messageContent}`,
          message_owner: `${messageOwner}`,
          user_id: `${userId}`,
        },
      ])
      .select();
    return data;
  } catch (e) {
    throw e;
  }
}
