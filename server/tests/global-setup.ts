import { Sequelize } from 'sequelize-typescript';
import { User } from '../src/models/user.model';
import { Ticket } from '../src/models/ticket.model';
import { Comment } from '../src/models/comment.model';
import { Category } from '../src/models/category.model';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:', // ⚡ In-memory pour ne pas polluer ta base
  models: [User, Ticket, Comment, Category],
  logging: false,
});

export async function setupTestDB() {
  await sequelize.sync({ force: true });
}
