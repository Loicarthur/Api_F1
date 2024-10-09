// src/types/express.d.ts

import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: boolean;
      };
    }
  }
}
