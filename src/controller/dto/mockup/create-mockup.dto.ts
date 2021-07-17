import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";


export class CreateMockupDto {
    
    @ApiProperty({  type: 'number', required: false, description: "Identificador" })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(100)
    id: number;

    @ApiProperty({  type: 'string', required: true, description: "Detalle del mockup" })
    @IsString()
    @Length(5, 50)
    message: string;
}
