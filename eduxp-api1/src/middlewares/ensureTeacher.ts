import { Request, Response, NextFunction } from "express";

export function ensureTeacher(req: Request, res: Response, next: NextFunction) {
  if (req.user.role !== "TEACHER") {
    return res.status(403).json({ error: "Only teachers allowed" });
  }

  next();
}
