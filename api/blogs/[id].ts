import type { VercelRequest, VercelResponse } from "@vercel/node";

module.exports = function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { id } = req.query;

  res.status(200).json({
    id,
    title: "Test Blog",
  });
};
