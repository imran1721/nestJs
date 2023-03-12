import { ApiProperty } from '@nestjs/swagger';

export class UserId {
    @ApiProperty()
    id?: string;
}