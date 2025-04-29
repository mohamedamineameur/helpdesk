import { JwtPayload } from '../../middlewares/auth.middleware';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: 'admin' | 'agent' | 'client';
      };
    }
  }
}
