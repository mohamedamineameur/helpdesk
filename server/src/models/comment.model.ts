import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import { User } from './user.model';
  import { Ticket } from './ticket.model';

    export interface CommentAttributes {
        id: string;
        content: string;
        userId: string;
        ticketId: string;
    }
    export interface CommentCreationAttributes {
        content: string;
        userId: string;
        ticketId: string;
    }
  
  @Table({ tableName: 'comments' })
  export class Comment extends Model<CommentAttributes, CommentCreationAttributes> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    id!: string;
  
    @Column({ type: DataType.TEXT, allowNull: false })
    content!: string;
  
    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: false })
    userId!: string;
  
    @BelongsTo(() => User)
    user!: User;
  
    @ForeignKey(() => Ticket)
    @Column({ type: DataType.UUID, allowNull: false })
    ticketId!: string;
  
    @BelongsTo(() => Ticket)
    ticket!: Ticket;
  }
  