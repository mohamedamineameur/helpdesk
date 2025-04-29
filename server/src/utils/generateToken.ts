import jwt from 'jsonwebtoken';

export function generateToken(id: string, role: string): string {
  const payload = { id, role };
  
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '7d', // 7 jours de validité
  });
}
