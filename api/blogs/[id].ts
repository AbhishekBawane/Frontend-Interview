import { blogs } from "../../db.json";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { id } = req.query;

  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  return res.status(200).json(blog);
}
