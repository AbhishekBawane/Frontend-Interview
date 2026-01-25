import type { VercelRequest, VercelResponse } from "@vercel/node";
import { blogs } from "../data/blogs";

export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === "GET") {
    return res.status(200).json(blogs);
  }

  res.status(405).json({ message: "Method not allowed" });
}
