import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsObject, IsString, Length, Max, Min, ValidateNested } from "class-validator";

export class RiskFlowReqDTO {
    @ApiProperty({  type: 'array', required: false, description: "" })
    @IsArray()
    flow: [];
    @ApiProperty({  type: 'boolean', required: false, description: "" })
    @IsBoolean()
    isMigratedUser: boolean;
    @ApiProperty({  type: 'object', required: false, description: "" })
    @IsObject()
    @ValidateNested({ each: true })
    InfoUser: {  
      typeDocument: string;
      numberDocument: string;
      dateDocument: string;
      cityDocument: string;
      name: string;
      firstLastName: string;
      email: string;
      telephoneNumber: string;
    }
  }
  