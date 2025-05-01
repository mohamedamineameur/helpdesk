import dotenv from 'dotenv'; 
import { Sequelize } from 'sequelize-typescript';
import { User } from '../src/models/user.model';
import { Ticket } from '../src/models/ticket.model';
import { Comment } from '../src/models/comment.model';
import { Category } from '../src/models/category.model';
dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/database.sqlite',
  models: [User, Ticket, Comment, Category],
  logging: false,
});

import bcrypt from 'bcryptjs';

async function createDefaultAdmin() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL;
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
    const adminUsername = process.env.DEFAULT_ADMIN_USERNAME || 'admin';

    if (!adminEmail || !adminPassword) {
      console.error('❌ Please set DEFAULT_ADMIN_EMAIL and DEFAULT_ADMIN_PASSWORD in your .env file.');
      process.exit(1);
    }

    const existing = await User.findOne({ where: { email: adminEmail } });
    if (existing) {
      console.log('✅ Admin already exists.');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      username: adminUsername,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    });

    console.log('✅ Admin user created successfully.');
  } catch (err) {
    console.error('❌ Failed to create admin:', err);
  } finally {
    await sequelize.close();
  }
}

createDefaultAdmin();
