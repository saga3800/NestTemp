
import { HttpStatus, Injectable } from '@nestjs/common';
import { IGlobalValidateIService } from '../globalValidate.service';
import GeneralUtil from 'src/common/utils/utils';
import { IServiceErrorUc } from 'src/core/use-case/resource/service-error.resource.uc';
import { GlobalReqOrigin } from 'src/common/configuration/general.config';
import { EmessageMapping } from 'src/common/utils/enums/message.enum';
import { BusinessException } from 'src/common/lib/business-exceptions';




@Injectable()
export class GlobalValidateIService implements IGlobalValidateIService {


    constructor(
        public readonly _serviceError: IServiceErrorUc
    ) { }

    public validateChannel(channel: string): any {

        const channelValidate:boolean = GeneralUtil.validateChannel(channel);
        if (!channelValidate) {

            throw new BusinessException(
                HttpStatus.CREATED,
                EmessageMapping.CHANNEL_ERROR,
                true
            );
        }
        return true
    }

}