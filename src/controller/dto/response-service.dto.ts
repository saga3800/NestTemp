import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { EmessageMapping } from "src/common/utils/enums/message.enum";
import utils from "src/common/utils/utils";
import { MessageService } from "../service/impl/message.service.impl";

/**
 * Clase base para el manejo de respuesta de todos los metodos que se exponen por el controlador
 */
export class ResponseService<T = any> {

    @ApiProperty({
        description: 'Tiempo de respuesta'
    })
    public responseTime?: number;
    @ApiProperty({
        description: 'Fecha y hora en la que se hace el request'
    })
    public requestTime?: Date;
    @ApiProperty({
        description: 'Origen de la respuesta'
    })
    public origen?: string;
    @ApiProperty({
        description: 'Mensaje enviado'
    })
    public message: string;
    @ApiProperty({
        description: 'Id del tracer'
    })
    public readonly process?: string;

    constructor(
        public success: boolean = true,
        message: EmessageMapping | string = EmessageMapping.DEFAULT,
        public status: number = 200,
        public documents?: T
    ) {
        this.process = utils.getCorrelationalId;
        this.message = MessageService.mappingMessage(EmessageMapping[message]) || message;
    }


}