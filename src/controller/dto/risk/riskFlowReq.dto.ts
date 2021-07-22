import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsObject, Length, Max, Min } from "class-validator";

 
export class RiskFlowReqDTO {
    @ApiProperty({  type: 'array', required: false, description: "Identificador" })
    @IsArray()
    flow: [];
    @ApiProperty({  type: 'number', required: false, description: "Identificador" })
    @IsBoolean()
    isMigratedUser: boolean;
    @ApiProperty({  type: 'number', required: false, description: "Identificador" })
    @IsObject()
    InfoUser: {  
      typeDocument: string;
      numberDocument: string;
      dateDocument: string;
      cityDocument: string;
      name: string;
      firstLastName: string;
      email: string;
      telephoneNumber: string;
    };
  }
  