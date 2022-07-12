import { Injectable } from '@nestjs/common';
import { IServiceError } from 'src/core/entity/service-error/service-error.entity';
import { IServiceErrorProvider } from 'src/data-provider/service-error.provider';
import { IServiceErrorUc } from '../service-error.resource.uc';
import { ResponsePaginator } from 'src/controller/dto/response-paginator.dto';
import { GlobalReqOrigin } from 'src/common/configuration/general.config';
import { BusinessException } from 'src/common/lib/business-exceptions';
import GeneralUtil from 'src/common/utils/utils';
import { ITaskError } from 'src/core/entity/service-error/task-error.entity';
import Logging from 'src/common/lib/logging';

@Injectable()
export class ServiceErrorUcimpl implements IServiceErrorUc {

    constructor(
        private readonly _serviceErrorProvider: IServiceErrorProvider
    ) { }
    private readonly logger = new Logging(ServiceErrorUcimpl.name);

    async createServiceError(error: any, task: ITaskError) {
        this.logger.write(task.description, task.name, true, GlobalReqOrigin.request);

        if (error instanceof BusinessException) {
            throw error;
        }
        const dataError: IServiceError = {
            origen: GlobalReqOrigin.globalOrigin,
            message: error.message,
            stack: error.stack,
            request: GlobalReqOrigin.request,
            channel: GlobalReqOrigin.requestHeaders
        }
        this._serviceErrorProvider.createServiceError(dataError);
        // throw error;
    }

    async getServiceErrors(filter: any): Promise<any> {
        let result = {
            success: false,
            message: '',
            documents: []
        }
        const resultDate = GeneralUtil.validateDate(filter.startDate, filter.endDate);
        if (resultDate === 1 || resultDate > 30) {
            result.message = 'Error en fechas de consulta la fecha de inicio es mayor a la final o existen fechas de mas de 30 dias';
            return result;
        }


        const query = {
            createdAt: {
                $gte: new Date(filter.startDate.toISOString()),
                $lte: new Date(filter.endDate.toISOString())
            }
        };


        const documents = await this._serviceErrorProvider.getServiceErrors(
            query
        );
        if (documents.length > 0) {
            result.success = true;
            result.message = 'Consulta ejecutada correctamente';
            result.documents = documents
            return result;

        }
        else {
            result.message = 'No se encontraron resultados';
            return result
        }
    }
}
