import utils from "src/common/utils/utils";

/**
 * Clase base para el manejo de respuesta de todos los metodos que se exponen por el controlador
 */
export class ResponseService<T = any> {

    public responseTime?: number;
    public requestTime?: Date;
    public origen?: string;
    public readonly process?: string;

    constructor(
        public success: boolean = true,
        public message: string = 'Execution successfully',
        public status: number = 200,
        public documents?: T
    ) {
        this.process = utils.getCorrelationalId;
    }

    
}