import { Request, Response, NextFunction } from 'express';

const API_KEY = process.env.API_KEY;

export function authenticateApiKey(req: Request, res: Response, next: NextFunction) {
  const providedApiKey = req.headers['api-key'] as string;

  if (!providedApiKey || providedApiKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}
