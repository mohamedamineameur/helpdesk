import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username?: string;
        email: string;
        role: 'admin' | 'agent' | 'client';
      };
    }
  }
}
