import {
  Model,
  Table,
  Column,
  AutoIncrement,
  NotEmpty,
  DataType,
  Unique,
} from 'sequelize-typescript';

import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  id?: number | null;

  @ApiProperty()
  @NotEmpty
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName?: string;

  @ApiProperty()
  @NotEmpty
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName?: string;

  @ApiProperty()
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

  @ApiProperty()
  @NotEmpty
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password?: string;

  @ApiProperty()
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
