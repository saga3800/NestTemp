// import utils from "src/common/utils/utils";

/**
 * Clase base para el manejo de respuesta de todos los metodos que se exponen por el controlador
 */
export class ResponseService<T = any> {

    public responseTime?: number;
    public requestTime?: Date;
    // public origen?: string;
    public readonly process?: string;

    constructor(
        public success: boolean = true,
        public origin: string = "APIMAutEntiFraudValidate",
        public status: number = 200,
        public message: string = 'Execution successfully',
        public documents: T,
    ) {
        // this.process = utils.getCorrelationalId;
    }

    
}