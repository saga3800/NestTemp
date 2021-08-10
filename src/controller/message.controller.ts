import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import generalConfig from 'src/common/configuration/general.config';
import { MethodMessage } from 'src/common/utils/enums/mapping-api-rest';
import GeneralUtil from 'src/common/utils/utils';
import { IMessageDTO } from './dto/message/message.dto';
import { IMessageService } from './service/message.service';

@Controller(`${generalConfig.apiVersion}${generalConfig.controllerMessage}`)
export class MessageController {
  constructor(private readonly _messageService: IMessageService) {}

  @Get(MethodMessage.GETBYID)
  message(@Param('Id') idMessage) {
    if (!GeneralUtil.validateValueRequired(idMessage))
      throw new BadRequestException(
        'Debe indicar el identificador del mensaje.',
      );

    return this._messageService.getById(idMessage);
  }

  @Get(MethodMessage.GETALL)
  getAll() {
    return this._messageService.getMessages();
  }

  @Put(MethodMessage.UPDATE)
  update(@Param('Id') id, @Body() messge: IMessageDTO) {
    if (id != messge.id)
      throw new BadRequestException('El identificador no coincide.');

    return this._messageService.update(messge);
  }
}
