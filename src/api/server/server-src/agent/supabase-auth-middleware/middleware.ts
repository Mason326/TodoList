import { supabaseAdmin } from "../index.js";
import { createClient } from "@supabase/supabase-js";

export function createUserClient(accessToken: string) {
  return createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_ANON_KEY || "",
    {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}

export async function supabaseAuthMiddleware(req: any, res: any, next: any) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log(token);
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token);
    console.log(user);
    console.log(supabaseAdmin);
    console.log(error);

    if (error || !user) {
      console.error("Supabase error details:", {
        message: error?.message,
        status: error?.status,
        name: error?.name,
      });

      return res.status(401).json({ error: "Invalid token" });
    }

    req.accessToken = token;

    next();
  } catch (error) {
    res.status(500).json({ error: "Authentication error" });
  }
}
