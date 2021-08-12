import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { IMockupService } from './service/mockup.service';
import { CreateMockupDto } from './dto/mockup/create-mockup.dto';
import { UpdateMockupDto } from './dto/mockup/update-mockup.dto';
import { ApiOperation } from '@nestjs/swagger';
import generalConfig from 'src/common/configuration/general.config';

/**
 * En el controlador se definen los metodos a exponer por parte del servicio
 * En caso de que el servicio requiera paths diferentes, se debe crear un controller por cada path 
 */
 @Controller(`${generalConfig.apiVersion}${generalConfig.controllerMockup}`)
export class MockupController {

  //En el constructor se injecta la definición del service que procesará la petición. No se debe hacer un llamado directo a la implementación
  constructor(private readonly mockupService: IMockupService) { }


  @Post()
  @ApiOperation({
    description: "Crea un nuevo registro de mockup"
  })
  create(@Body() createMockupDto: CreateMockupDto) {
    return this.mockupService.create(createMockupDto);
  }

  @Get()
  @ApiOperation({
    description: "Crea un nuevo registro de mockup"
  })
  findAll(@Query('page') _page: number, @Query('limit') _limit: number) {
    return this.mockupService.findAll(_page, _limit);
  }

  @Get(':id')
  @ApiOperation({
    description: "Consulta registro de mockup"
  })
  findOne(@Param('id') id: number) {
    return this.mockupService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    description: "Actualiza registro de mockup"
  })
  update(@Param('id') id: number, @Body() updateMockupDto: UpdateMockupDto) {
    return this.mockupService.update(id, updateMockupDto);
  }

  @Delete(':id')
  @ApiOperation({
    description: "Elimina registro de mockup"
  })
  remove(@Param('id') id: number) {
    return this.mockupService.remove(+id);
  }

  //Para mayor detalle, ver documentación oficial https://docs.nestjs.com/controllers
}
