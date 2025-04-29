// @ts-nocheck
import request from 'supertest';
import app from '../../src/app';
import { setupTestDB } from '../global-setup';
import { User } from '../../src/models/user.model';
import { generateToken } from '../../src/utils/generateToken';
import { hashPassword } from '../../src/utils/passwordHash';

let adminToken: string;

beforeAll(async () => {
  await setupTestDB();

  const password = await hashPassword('Admin456!');

  const admin = await User.create({
    username: 'adminuser',
    email: 'admin@example.com',
    password,
    role: 'admin',
  });

  adminToken = generateToken(admin.id, admin.role);
});

describe('Category API', () => {
  it('should allow admin to create a category', async () => {
    const res = await request(app)
      .post('/api/categories')
      .set('Cookie', [`token=${adminToken}`])
      .send({
        name: 'Support Technique',
        description: 'Problèmes liés à la technique',
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Support Technique');
  });

  it('should allow admin to fetch all categories', async () => {
    const res = await request(app)
      .get('/api/categories')
      .set('Cookie', [`token=${adminToken}`]);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should allow admin to update a category', async () => {
    const categories = await request(app)
      .get('/api/categories')
      .set('Cookie', [`token=${adminToken}`]);
      
    const categoryId = categories.body[0].id;

    const res = await request(app)
      .put(`/api/categories/${categoryId}`)
      .set('Cookie', [`token=${adminToken}`])
      .send({
        name: 'Support Technique Modifié',
      });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Support Technique Modifié');
  });

  it('should allow admin to delete a category', async () => {
    const categories = await request(app)
      .get('/api/categories')
      .set('Cookie', [`token=${adminToken}`]);

    const categoryId = categories.body[0].id;

    const res = await request(app)
      .delete(`/api/categories/${categoryId}`)
      .set('Cookie', [`token=${adminToken}`]);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Category deleted');
  });
});
