import type { VercelRequest, VercelResponse } from "@vercel/node";

module.exports = function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.status(200).json({
    ok: true,
    message: "API is working",
  });
};
