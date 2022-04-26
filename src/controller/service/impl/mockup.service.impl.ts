import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import Logging from '../../../common/lib/logging';
import { Etask } from '../../../common/utils/enums/taks.enum';
import { ResponseService } from '../../../controller/dto/response-service.dto';
import { UpdateMockupDto } from '../../dto/mockup/update-mockup.dto';
import { CreateMockupDto } from '../../dto/mockup/create-mockup.dto';
import { IMockupService } from '../mockup.service';
import { ResponsePaginator } from '../../../controller/dto/response-paginator.dto';

@Injectable()
export class MockupService implements IMockupService {

  private readonly logger = new Logging(MockupService.name);

  create(createMockupDto: CreateMockupDto) {
    this.logger.write('traza de prueba', Etask.CREATE);
    return new ResponseService(true, createMockupDto.message, 200, createMockupDto);
  }

  findAll(page: number = 1, limit: number = 10) {
    this.logger.write('traza de prueba', Etask.FINDALL);
    const documents: CreateMockupDto[] = [
      { id: 1, message: 'Mockup one' },
      { id: 2, message: 'Mockup two' },
      { id: 3, message: 'Mockup three' },
      { id: 4, message: 'Mockup four' }
    ];
    return new ResponseService(true, 'Consulta ejecutada correctamente.', 200, new ResponsePaginator(documents, page, limit));
  }

  findOne(id: number) {
    this.logger.write('traza de prueba', Etask.FINDONE);
    return new ResponseService(true, 'Consulta ejecutada correctamente.', 200, { id: 1, message: 'Mockup one' });
  }

  update(id: number, updateMockupDto: UpdateMockupDto) {

    if (id != updateMockupDto.id) {
      this.logger.write('traza error', Etask.UPDATE, true, updateMockupDto);
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    return new ResponseService(true, `This action update a #${id} mockup`, 200, updateMockupDto);
  }

  remove(id: number) {
    this.logger.write('traza de prueba', Etask.REMOVE);
    return new ResponseService(true, `This action removes a #${id} mockup`);
  }
}
