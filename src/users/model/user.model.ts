import {
  Model,
  Table,
  Column,
  AutoIncrement,
  NotEmpty,
  DataType,
  Unique,
} from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  id?: number | null;

  @NotEmpty
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName?: string;

  @NotEmpty
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName?: string;

  @NotEmpty
  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: { msg: 'Invalid Email!' },
    },
  })
  email?: string;

  @NotEmpty
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password?: string;

  @NotEmpty
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      is: {
        args: ['^[0-9]{10}$'],
        msg: 'Incorrect Phone number, please try again!',
      },
    },
  })
  phone?: string;
}
