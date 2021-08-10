import { EmessageMapping } from "src/common/utils/enums/message.enum";
import UtilMessage from "src/common/utils/message.util";
import utils from "src/common/utils/utils";

/**
 * Clase base para el manejo de respuesta de todos los metodos que se exponen por el controlador
 */
export class ResponseService<T = any> {

    public responseTime?: number;
    public requestTime?: Date;
    public origen?: string;
    public message: string;
    public readonly process?: string;

    constructor(
        public success: boolean = true,
        message: EmessageMapping | string = EmessageMapping.DEFAULT,
        public status: number = 200,
        public documents?: T
    ) {
        this.process = utils.getCorrelationalId;
        this.message = UtilMessage.mappingMessage(EmessageMapping[message]) || message;
    }


}