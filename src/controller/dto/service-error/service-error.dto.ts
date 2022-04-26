import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsInt, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class IErrorDTO {
    
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @ApiProperty({ required: false, description: "This is page of query" })
    page?: number=1;
    
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @ApiProperty({ required: false, description: "This is limit of query" })
    limit?: number;

    @ApiProperty({ type: 'string', required: false, description: "This is numOrden of query" })
    @IsOptional()
    @IsString()
    numOrden?: string = "";

    @ApiProperty({ type: 'date', required: true, description: "This is startDate of query"})
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @ApiProperty({ required: true, description: "This is endDate of query"})
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    endDate: Date;
}