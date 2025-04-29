import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
  } from 'sequelize-typescript';
  import { Ticket } from './ticket.model';

    export interface CategoryAttributes {
        id: string;
        name: string;
        description?: string;
    }
    export interface CategoryCreationAttributes {
        name: string;
        description?: string;
    }
  
  @Table({ tableName: 'categories' })
  export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    id!: string;
  
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    name!: string;
  
    @Column({ type: DataType.STRING, allowNull: true })
    description?: string;
  
    @HasMany(() => Ticket)
    tickets!: Ticket[];
  }
  