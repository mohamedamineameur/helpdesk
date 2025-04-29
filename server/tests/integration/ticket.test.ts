// @ts-nocheck
import request from 'supertest';
import app from '../../src/app';
import { setupTestDB } from '../global-setup';
import { User } from '../../src/models/user.model';
import { generateToken } from '../../src/utils/generateToken';
import { hashPassword } from '../../src/utils/passwordHash';

let clientToken: string;
let agentToken: string;
let ticketId: string;
let agentId: string;
beforeAll(async () => {
  await setupTestDB();

  const clientPassword = await hashPassword('Client123!');
  const agentPassword = await hashPassword('Agent123!');

  const client = await User.create({
    username: 'clientuser',
    email: 'client@example.com',
    password: clientPassword,
    role: 'client',
  });

  const agent = await User.create({
    username: 'agentuser',
    email: 'agent@example.com',
    password: agentPassword,
    role: 'agent',
  });
    agentId = agent.id;

  clientToken = generateToken(client.id, client.role);
  agentToken = generateToken(agent.id, agent.role);
});

describe('Ticket API', () => {
  it('should allow a client to create a ticket', async () => {
    const res = await request(app)
      .post('/api/tickets')
      .set('Cookie', [`token=${clientToken}`])
      .send({
        title: 'Ticket de test',
        description: 'Problème urgent à régler',
        priority: 'high',
      });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Ticket de test');
    ticketId = res.body.id;
  });

  it('should allow an agent to assign himself to a ticket', async () => {
    const res = await request(app)
      .patch(`/api/tickets/${ticketId}/assign`)
      .set('Cookie', [`token=${agentToken}`])
      .send({ assignedToId: agentId });


    expect(res.status).toBe(200);
    expect(res.body.assignedToId).toBeDefined();
  });

  it('should allow agent to update ticket status', async () => {
    const res = await request(app)
      .patch(`/api/tickets/${ticketId}/status`)
      .set('Cookie', [`token=${agentToken}`])
      .send({ status: 'in_progress' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('in_progress');
  });

  it('should allow agent to resolve a ticket', async () => {
    const res = await request(app)
      .patch(`/api/tickets/${ticketId}/status`)
      .set('Cookie', [`token=${agentToken}`])
      .send({ status: 'resolved' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('resolved');
  });

  it('should allow admin to delete a ticket', async () => {
    const adminPassword = await hashPassword('Admin123!');
    const admin = await User.create({
      username: 'adminuser',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
    });

    const adminToken = generateToken(admin.id, admin.role);

    const res = await request(app)
      .delete(`/api/tickets/${ticketId}`)
      .set('Cookie', [`token=${adminToken}`]);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Ticket deleted');
  });
});
