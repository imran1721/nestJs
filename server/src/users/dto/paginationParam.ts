import { ApiPropertyOptional, } from '@nestjs/swagger';

export class PaginationParam {
    
    @ApiPropertyOptional()
    page?: string;

    @ApiPropertyOptional()
    limit?: string;

    @ApiPropertyOptional()
    sort?: string;
}