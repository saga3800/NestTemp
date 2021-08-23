
const info = require('../../../package.json');
import util from "../utils/utils";
import { logger, logOutput, levelsErros } from '@claro/logging-library';
import { Etask } from "../utils/enums/taks.enum";
import generalConfig from "../configuration/general.config";

export default class Logging {

    private readonly LOG_LEVEL = generalConfig.logLevel;
    private readonly context: string;

    constructor(context: string) {
        this.context = context;
    }


    /**
     * Escribe traza informativa en la consola del pod
     * @param message 
     * @param taks 
     * @param request 
     * @param response 
     */
    public write(message: string, taks: Etask, isError: boolean = false, request?: any, response?: any) {
        if (this.LOG_LEVEL === 'ALL' || (this.LOG_LEVEL == 'ERROR' && isError))
            logger.log(logOutput(info.name, `${this.context || ''} - ${taks || ''}`, util.getCorrelationalId,
                message,
                isError ? levelsErros.ERROR : levelsErros.INFO, request, response));
    }


}