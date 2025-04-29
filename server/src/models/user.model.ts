import {
    Table,
    Column,
    Model,
    DataType,
    HasMany
  } from 'sequelize-typescript';
  import { Ticket } from './ticket.model';
  import { Comment } from './comment.model';
  
  export interface UserAttributes {
    id: string;
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'agent' | 'client';
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface UserCreationAttributes {
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'agent' | 'client';
    isActive?: boolean;
  }
  
  @Table({ tableName: 'users' })
  export class User extends Model<UserAttributes, UserCreationAttributes> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    id!: string;
  
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    username!: string;
  
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email!: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    password!: string;
  
    @Column({ type: DataType.ENUM('admin', 'agent', 'client'), allowNull: false })
    role!: 'admin' | 'agent' | 'client';
  
    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    isActive!: boolean;
  
    @HasMany(() => Ticket, 'createdById')
    createdTickets!: Ticket[];
  
    @HasMany(() => Ticket, 'assignedToId')
    assignedTickets!: Ticket[];
  
    @HasMany(() => Comment)
    comments!: Comment[];
  }
  