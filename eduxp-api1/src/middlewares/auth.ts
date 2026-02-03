import { Request, Response, NextFunction } from "express";

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
  const user = req.headers["user"];

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.user = JSON.parse(user as string);
  next();
}
