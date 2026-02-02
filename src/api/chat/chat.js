import { supabase } from "../../supabase/";

export default async function fetchMessages() {
  try {
    let { data: messages, error } = await supabase.from("messages").select("*");
    return messages;
  } catch (e) {
    throw e;
  }
}
