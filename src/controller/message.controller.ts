import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Put, Query, } from '@nestjs/common';
import generalConfig from 'src/common/configuration/general.config';
import { MethodMessage } from 'src/common/utils/enums/mapping-api-rest';
import GeneralUtil from 'src/common/utils/utils';
import { IMessageDTO } from './dto/message/message.dto';
import { IMessageService } from './service/message.service';

@Controller(`${generalConfig.apiVersion}${generalConfig.controllerMessage}`)
export class MessageController {
  constructor(private readonly _messageService: IMessageService) { }


  @Get(MethodMessage.GETBYID)
  message(@Param('Id') _id: string) {
    if (!GeneralUtil.validateValueRequired(_id))
      throw new BadRequestException(
        'Debe indicar el identificador del mensaje.',
      );

    return this._messageService.getById(_id);
  }


  @Get(MethodMessage.GETALL)
  getAll(
    @Query('page', ParseIntPipe) _page: number = 1,
    @Query('limit', ParseIntPipe) _limit: number = 1,
    @Query('filter') _filter: any = '{}',
  ) {
    return this._messageService.getMessages(_page, _limit, _filter);
  }


  @Put(MethodMessage.UPDATE)
  update(@Param('Id') id: string, @Body() messge: IMessageDTO) {
    if (id != messge.id)
      throw new BadRequestException('El identificador no coincide.');

    return this._messageService.update(messge);
  }
}
