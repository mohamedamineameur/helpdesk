
// @ts-nocheck
import request from 'supertest';
import app from '../../src/app';
import { setupTestDB } from '../global-setup';
import { User } from '../../src/models/user.model';
import { Ticket } from '../../src/models/ticket.model';
import { generateToken } from '../../src/utils/generateToken';
import { hashPassword } from '../../src/utils/passwordHash';

let userToken: string;
let ticketId: string;
let userId: string;

beforeAll(async () => {
  await setupTestDB();

  const password = await hashPassword('User123!');

  const user = await User.create({
    username: 'testuser',
    email: 'user@example.com',
    password,
    role: 'client',
  });
    userId = user.id;

  const ticket = await Ticket.create({
    title: 'Ticket pour commentaire',
    description: 'Exemple de ticket',
    priority: 'medium',
    createdById: user.id,
  });

  userToken = generateToken(user.id, user.role);
  ticketId = ticket.id;
});

describe('Comment API', () => {
  it('should allow a user to add a comment to a ticket', async () => {
    const res = await request(app)
    .post('/api/comments')
    .set('Cookie', [`token=${userToken}`])
    .send({
      content: 'Voici un commentaire important',
      ticketId,
      userId: userId, // rajouter l'id de l'utilisateur connecté
    });
  

    expect(res.status).toBe(201);
    expect(res.body.content).toBe('Voici un commentaire important');
  });

  it('should fetch comments for a ticket', async () => {
    const res = await request(app)
      .get(`/api/comments/ticket/${ticketId}`)
      .set('Cookie', [`token=${userToken}`]);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
