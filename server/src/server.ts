import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import app from './app';
import { User } from './models/user.model';
import { Ticket } from './models/ticket.model';
import { Comment } from './models/comment.model';
import { Category } from './models/category.model';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialise Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/database.sqlite',
  models: [User, Ticket, Comment, Category],
  logging: false, // Passe à true si tu veux voir les requêtes SQL
});

// Fonction pour lancer l'app
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    await sequelize.sync({ alter: true }); // Dev : alter pour auto MAJ modèles

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
}

startServer();
