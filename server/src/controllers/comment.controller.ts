import { Request, Response, NextFunction } from 'express';
import { Comment } from '../models/comment.model';

export async function createComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { content, ticketId } = req.body;
    
    const comment = await Comment.create({
      content,
      userId: req.user?.id || '',
      ticketId,
    });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
}

export async function getCommentsByTicket(req: Request, res: Response) {
  const comments = await Comment.findAll({
    where: { ticketId: req.params.ticketId },
  });
  res.json(comments);
}
