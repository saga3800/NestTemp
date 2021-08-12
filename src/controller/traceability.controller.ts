import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  HttpCode,
  Delete,
  Post,
} from '@nestjs/common';
import generalConfig from 'src/common/configuration/general.config';
import { MethodTraceability } from 'src/common/utils/enums/mapping-api-rest';
import GeneralUtil from 'src/common/utils/utils';
import { ITraceabilityDTO } from './dto/traceability/traceability.dto';
import { ITraceabilityService } from './service/traceability.service';

@Controller(
  `${generalConfig.apiVersion}${generalConfig.controllerTraceability}`,
)
export class TraceabilityController {
  constructor(private readonly _traceabilityService: ITraceabilityService) {}

  @Get(MethodTraceability.GETBYID)
  @HttpCode(200)
  getTrace(@Param('Id') processId) {
    if (!GeneralUtil.validateValueRequired(processId))
      throw new BadRequestException(
        'Debe indicar el identificador del trace.',
      );

    return this._traceabilityService.getById(processId);
  }

  @Post(MethodTraceability.CREATE)
  @HttpCode(201)
  create(@Body() _data: ITraceabilityDTO) {
    return this._traceabilityService.create(_data);
  }

  @Get(MethodTraceability.GETALL)
  @HttpCode(200)
  getAll(
    @Query('page', ParseIntPipe) _page: number = 1,
    @Query('limit', ParseIntPipe) _limit: number = 1,
    @Query('filter') _filter: any = '{}',
  ) {
    return this._traceabilityService.getAll(_page, _limit, _filter);
  }

  @Put(MethodTraceability.UPDATE)
  @HttpCode(200)
  update(@Param('Id') processId, @Body() trace: ITraceabilityDTO) {
    if (processId != trace.processId)
      throw new BadRequestException('El identificador no coincide.');

    return this._traceabilityService.update(trace);
  }

  @Delete(MethodTraceability.DELETE)
  @HttpCode(200)
  delete(@Param('id') processId) {
      return this._traceabilityService.delete(processId);
  }

}
