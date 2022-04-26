import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { IServiceErrorService } from 'src/controller/service/service-error.service';
import generalConfig from 'src/common/configuration/general.config';
import { IErrorDTO } from 'src/controller/dto/service-error/service-error.dto';
import { ResponseService } from 'src/controller/dto/response-service.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller(`${generalConfig.apiVersion}${generalConfig.controllerError}`)
export class serviceErrorController{
    constructor(
        //private readonly _paramService: IParamService,
        private readonly _serviceErrorService: IServiceErrorService
    ) { }

    @Get()
    @ApiResponse({ type: ResponseService })
    getAll(
        @Query() query : IErrorDTO
    ) {
      
    try {
        return this._serviceErrorService.getServiceErrors(query.page, query.limit, {
            "_filter":{
                "numOrden": query.numOrden,
                "startDate": query.startDate,
                "endDate": query.endDate
            }});
    } catch (error) {
        throw new BadRequestException(error.message);
    }
    }
}