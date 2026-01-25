import { blogs } from "../db.json";
import { randomUUID } from "crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === "GET") {
    return res.status(200).json(blogs);
  }

  if (req.method === "POST") {
    const { title, description, content, category, coverImage } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newBlog = {
      id: randomUUID(),
      title,
      description,
      content,
      category,
      coverImage,
      date: new Date().toISOString(),
    };

    blogs.unshift(newBlog);

    return res.status(201).json(newBlog);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
