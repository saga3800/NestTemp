import { Injectable } from '@nestjs/common';
import { IServiceError } from 'src/core/entity/service-error/service-error.entity';
import { IServiceErrorProvider } from 'src/data-provider/service-error.provider';
import { IServiceErrorUc } from '../service-error.resource.uc';
import { ResponsePaginator } from 'src/controller/dto/response-paginator.dto';
import { GlobalReqOrigin } from 'src/common/configuration/general.config';
import { BusinessException } from 'src/common/lib/business-exceptions';
import GeneralUtil from 'src/common/utils/utils';

@Injectable()
export class ServiceErrorUcimpl implements IServiceErrorUc {

    constructor(
        private readonly _serviceErrorProvider: IServiceErrorProvider
    ) { }

    async createServiceError(serviceError: IServiceError) {
        this._serviceErrorProvider.createServiceError(serviceError);
    }

    async getServiceErrors(page: number, limit: number, filter: any): Promise<ResponsePaginator<IServiceError>> {
        const resultDate = GeneralUtil.validateDate(filter.startDate,filter.endDate);
        if(resultDate === 1 || resultDate > 30){
            throw new BusinessException(400, 'fechas de inicio mayor a final o fechas de mas de 30 dias');
        }

        const query = {
            createdAt: { 
                $gte: new Date(filter.startDate.toISOString()),
                $lte: new Date(filter.endDate.toISOString())
            }
        };
        if(!!filter.numOrden) {
            query["numOrden"]=filter.numOrden;
        };
            if (filter != {}) {
                const total: number = await this._serviceErrorProvider.getTotal(query);
                if (total == 0) {
                    this._serviceErrorProvider.createServiceError({
                        'success': false,
                        'origen': GlobalReqOrigin.globalOrigin,
                        'message': "'No se encontró información con los filtros indicados'",
                        'serviceid': "MSTemplateNestJs",
                        'numOrden': filter.numOrden || "",
                        'numSubOrder': "",
                        'documents':{
                        'error': "'No se encontró información con los filtros indicados'",
                            'request':"",
                            'response':""
                        }
                    });
                    throw new BusinessException(400, 'No se encontró información con los filtros indicados');
                }
            }

            const documents = await this._serviceErrorProvider.getServiceErrors(
                page,
                limit,
                query
            );
            return new ResponsePaginator(documents, page, limit);

    }
}
