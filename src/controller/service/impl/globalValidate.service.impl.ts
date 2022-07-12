
import { HttpStatus, Injectable } from '@nestjs/common';
import { IGlobalValidateIService } from '../globalValidate.service';
import GeneralUtil from 'src/common/utils/utils';
import { IServiceErrorUc } from 'src/core/use-case/resource/service-error.resource.uc';
import { GlobalReqOrigin } from 'src/common/configuration/general.config';
import { EmessageMapping } from 'src/common/utils/enums/message.enum';
import { BusinessException } from 'src/common/lib/business-exceptions';
import Logging from 'src/common/lib/logging';
import { Etask, ETaskDesc } from 'src/common/utils/enums/taks.enum';
import { ITaskError } from 'src/core/entity/service-error/task-error.entity';
import Traceability from 'src/common/lib/traceability';
import { EStatusTracingGeneral, ETaskTracingGeneral } from 'src/common/utils/enums/tracing.enum';
import { IServiceTracingUc } from 'src/core/use-case/resource/service-tracing.resource.uc';




@Injectable()
export class GlobalValidateIService implements IGlobalValidateIService {


    constructor(
        public readonly _serviceError: IServiceErrorUc,
        public readonly _serviceTracing: IServiceTracingUc
    ) { }

    private readonly logger = new Logging(GlobalValidateIService.name);
    
    async validateChannel(channel: string) {
        try {
            //Genera el log
            this.logger.write(ETaskDesc.CHANNEL, Etask.CHANNEL);

            const channelValidate: boolean = GeneralUtil.validateChannel(channel);
            if (!channelValidate) {

                let traceability = new Traceability({});
                traceability.setStatus(EStatusTracingGeneral.STATUS_SUCCESS);
                traceability.setDescription(ETaskDesc.CHANNEL);
                traceability.setTask(ETaskDesc.CHANNEL);
                this._serviceTracing.createServiceTracing(traceability.getTraceability());

                throw new BusinessException(
                    HttpStatus.CREATED,
                    EmessageMapping.CHANNEL_ERROR,
                    true
                );
            }
        } catch (error) {
            let task: ITaskError = {
                name: Etask.CHANNEL,
                description: ETaskDesc.CHANNEL
            }
            await this._serviceError.createServiceError(error, task);
        }
    }

}
