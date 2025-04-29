// @ts-nocheck
import request from 'supertest';
import app from '../../src/app';
import { setupTestDB } from '../global-setup';
import { User } from '../../src/models/user.model';
import { hashPassword } from '../../src/utils/passwordHash';

beforeAll(async () => {
  await setupTestDB();
});

describe('Auth API', () => {
  it('should login successfully and return cookie', async () => {
    const password = 'Password123!';
    const hashedPassword = await hashPassword(password);

    await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: hashedPassword,
      role: 'client',
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser@example.com', password });

    expect(res.status).toBe(200);
    expect(res.headers['set-cookie']).toBeDefined();
    expect(res.body.message).toBe('Login successful');
  });

  it('should fail login with wrong credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'wrong@example.com', password: 'wrongpass' });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });
});
