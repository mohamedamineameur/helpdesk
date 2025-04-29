import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
  } from 'sequelize-typescript';
  import { User } from './user.model';
  import { Comment } from './comment.model';
  import { Category } from './category.model';

  export interface TicketAttributes {
    id: string;
    title: string;
    description: string;
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'critical';
    createdById: string;
    assignedToId?: string;
    categoryId?: string;
    closedAt?: Date;
  }
    export interface TicketCreationAttributes {
    title: string;
    description: string;
    status?: 'open' | 'in_progress' | 'resolved' | 'closed';
    priority?: 'low' | 'medium' | 'high' | 'critical';
    createdById: string;
    assignedToId?: string;
    categoryId?: string;    
  }
  
  @Table({ tableName: 'tickets' })
  export class Ticket extends Model<TicketAttributes, TicketCreationAttributes> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    id!: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    title!: string;
  
    @Column({ type: DataType.TEXT, allowNull: false })
    description!: string;
  
    @Column({ type: DataType.ENUM('open', 'in_progress', 'resolved', 'closed'), defaultValue: 'open' })
    status!: 'open' | 'in_progress' | 'resolved' | 'closed';
  
    @Column({ type: DataType.ENUM('low', 'medium', 'high', 'critical'), defaultValue: 'medium' })
    priority!: 'low' | 'medium' | 'high' | 'critical';
  
    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: false })
    createdById!: string;
  
    @BelongsTo(() => User, 'createdById')
    createdBy!: User;
  
    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: true })
    assignedToId?: string;
  
    @BelongsTo(() => User, 'assignedToId')
    assignedTo?: User;
  
    @ForeignKey(() => Category)
    @Column({ type: DataType.UUID, allowNull: true })
    categoryId?: string;
  
    @BelongsTo(() => Category)
    category?: Category;
  
    @Column({ type: DataType.DATE, allowNull: true })
    closedAt?: Date;
  
    @HasMany(() => Comment)
    comments!: Comment[];
  }
  