import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Put, Query, } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import generalConfig from 'src/common/configuration/general.config';
import { MethodMessage } from 'src/common/utils/enums/mapping-api-rest';
import GeneralUtil from 'src/common/utils/utils';
import { IMessageDTO } from './dto/message/message.dto';
import { ResponseService } from './dto/response-service.dto';
import { IMessageService } from './service/message.service';

@ApiTags(generalConfig.controllerMessage)
@Controller(`${generalConfig.apiVersion}${generalConfig.controllerMessage}`)
export class MessageController {
  constructor(private readonly _messageService: IMessageService) { }


  @Get(MethodMessage.GETBYID)
  @ApiOperation({
    description: 'Obtener mensaje por id'
  })
  @ApiResponse({ type: ResponseService })
  message(@Param('Id') _id: string) {
    if (!GeneralUtil.validateValueRequired(_id))
      throw new BadRequestException(
        'Debe indicar el identificador del mensaje.',
      );

    return this._messageService.getById(_id);
  }


  @Get(MethodMessage.GETALL)
  @ApiOperation({
    description: 'Obtener mensajes usando filtro y paginado'
  })
  @ApiResponse({ type: ResponseService })
  getAll(
    @Query('page') _page: number = 1,
    @Query('limit') _limit: number = 15,
    @Query('filter') _filter: any = '{}'
  ) {
    return this._messageService.getMessages(+_page, +_limit, _filter);
  }


  @Put(MethodMessage.UPDATE)
  @ApiOperation({
    description: 'Actualizar un mensaje'
  })
  @ApiResponse({ type: ResponseService })
  update(@Param('Id') id: string, @Body() messge: IMessageDTO) {
    if (id != messge.id)
      throw new BadRequestException('El identificador no coincide.');

    return this._messageService.update(messge);
  }
}
