// @ts-nocheck
import request from 'supertest';
import app from '../../src/app';
import { setupTestDB } from '../global-setup';
import { generateToken } from '../../src/utils/generateToken';
import { User } from '../../src/models/user.model';
import { hashPassword } from '../../src/utils/passwordHash';

let adminToken: string;

beforeAll(async () => {
  await setupTestDB();

  const adminPassword = await hashPassword('AdminPass123!');
  const admin = await User.create({
    username: 'adminuser',
    email: 'admin@example.com',
    password: adminPassword,
    role: 'admin',
  });

  adminToken = generateToken(admin.id, admin.role);
});

describe('User API', () => {
  it('should create a user', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Cookie', [`token=${adminToken}`])
      .send({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'Password123!',
        role: 'client',
      });

    expect(res.status).toBe(201);
    expect(res.body.username).toBe('newuser');
    expect(res.body.role).toBe('client');
  });

  it('should fetch all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Cookie', [`token=${adminToken}`]);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
