import { ApiProperty } from '@nestjs/swagger';

export class LogInDetails {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}