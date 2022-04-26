import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { BusinessException } from 'src/common/lib/business-exceptions';
import { Cache } from "cache-manager";
import { ResponsePaginator } from 'src/controller/dto/response-paginator.dto';
import { IParamUc } from '../param.resource.uc';
import { IParam } from 'src/core/entity/param/param.entity';
import { IParamProvider } from 'src/data-provider/param.provider';
import { PARAM_CHANNEL } from '../../../../common/configuration/params/param-channel.config';
import Logging from 'src/common/lib/logging';
import { Etask } from 'src/common/utils/enums/taks.enum';
import { IServiceErrorUc } from '../service-error.resource.uc';
import { GlobalReqOrigin } from 'src/common/configuration/general.config';

@Injectable()
export class ParamUcimpl implements IParamUc {

    public static params: IParam[];
    private readonly logger = new Logging(ParamUcimpl.name);

    constructor(
        @Inject(CACHE_MANAGER) public readonly cacheManager: Cache,
        public readonly _paramProvider: IParamProvider,
        public readonly _serviceError: IServiceErrorUc
    ) { }

    public static get getMessages(): IParam[] {
        return ParamUcimpl.params;
    }

    async loadParams(): Promise<any> {
        let param: IParam[] = [];
        try {
            param = await this._paramProvider.getParams(1, 100, {});

            if (param.length == 0) {
                // Si no hay mensajes en bd, se insertan los mensajes
                await this._paramProvider.createParams(PARAM_CHANNEL);
            } else {
                // Valida elemento a elemento para validar su existencia
                PARAM_CHANNEL.forEach(async channel => {
                    let result = param.find(element => element.id_param == channel.id_param);

                    if (!result) {
                        await this._paramProvider.createParams([channel]);
                        result = null;
                    }
                });

            }
        } catch (error) {
            this._serviceError.createServiceError({
                'success': false,
                'origen': GlobalReqOrigin.globalOrigin,
                'message': error.message,
                'serviceid': "MSTemplateNestJs",
                'numOrden': GlobalReqOrigin.numOrden,
                'numSubOrder': GlobalReqOrigin.numSubOrder,
                'documents': {
                    'error': error.stack,
                    'request': "",
                    'response': ""
                }
            });
            this.logger.write(`Error cargando parámetros`, Etask.LOAD_MESSAGE, true, error);
        } finally {
            // Actualizar variable estática
            ParamUcimpl.params = (param.length == 0) ? PARAM_CHANNEL : param;
        }
    }

  

}