import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import ticketRoutes from './routes/ticket.routes';
import commentRoutes from './routes/comment.routes';
import categoryRoutes from './routes/category.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

// Middleware sécurité
app.use(helmet());

// Logger des requêtes (dev uniquement)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',  // ⚡ Frontend React
  credentials: true,               // ⚡ Autorise cookie cross-origin
}));

// Lire les cookies
app.use(cookieParser());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/categories', categoryRoutes);

// Middleware gestion des erreurs (doit être APPELÉ après les routes)
app.use(errorHandler);

export default app;
