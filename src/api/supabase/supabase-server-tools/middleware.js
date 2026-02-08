import { createUserClient, supabaseAdmin } from "./serverClient.js";

export async function supabaseAuthMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.supabaseClient = createUserClient(token);
    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ error: "Authentication error" });
  }
}
