import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ITraceabilityDTO {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "Process ID"})
    readonly processId: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "This is a service task"})
    readonly task: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: "This is the response code"})
    readonly responseCode: number;

}