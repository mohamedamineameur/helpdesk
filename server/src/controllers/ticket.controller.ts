import { Request, Response, NextFunction } from 'express';
import { Ticket } from '../models/ticket.model';

export async function createTicket(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description, priority, categoryId } = req.body;
    const ticket = await Ticket.create({
      title,
      description,
      priority,
      createdById: req.user?.id || '',
      categoryId,
    });
    res.status(201).json(ticket);
  } catch (error) {
    next(error);
  }
}

export async function getTickets(req: Request, res: Response) {
  const tickets = await Ticket.findAll();
  res.json(tickets);
}

export async function getTicketById(req: Request, res: Response) {
  const ticket = await Ticket.findByPk(req.params.id);
  if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
  res.json(ticket);
}

export async function updateTicketStatus(req: Request, res: Response) {
  const ticket = await Ticket.findByPk(req.params.id);
  if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

  ticket.status = req.body.status;
  await ticket.save();
  res.json(ticket);
}

export async function assignTicket(req: Request, res: Response) {
  const ticket = await Ticket.findByPk(req.params.id);
  if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

  ticket.assignedToId = req.body.assignedToId;
  await ticket.save();
  res.json(ticket);
}

export async function deleteTicket(req: Request, res: Response) {
  const ticket = await Ticket.findByPk(req.params.id);
  if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

  await ticket.destroy();
  res.json({ message: 'Ticket deleted' });
}
