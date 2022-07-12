import { Injectable } from '@nestjs/common';
import Logging from '../../../common/lib/logging';
import { IServiceErrorService } from '../service-error.service';
import { IServiceError } from 'src/core/entity/service-error/service-error.entity';
import { IServiceErrorUc } from 'src/core/use-case/resource/service-error.resource.uc';
import { Etask } from 'src/common/utils/enums/taks.enum';
import { ResponseService } from 'src/controller/dto/response-service.dto';

@Injectable()
export class ServiceErrorService implements IServiceErrorService {

  constructor(
    public readonly _serviceErrorUc: IServiceErrorUc
  ) {}

  private readonly logger = new Logging(ServiceErrorService.name);

  async createServiceError(message: string, stack: string, request?: any, response?: any) {
    this.logger.write('Traza de sendOrder', Etask.CREATE_SERVICE_ERROR);
    this._serviceErrorUc.createServiceError(message, stack, request, response);
  }

  async getServiceErrors(page: number, limit: number, filter: any): Promise<ResponseService<any>> {
      const result = await this._serviceErrorUc.getServiceErrors(page, limit, filter._filter);
      if(result){
        console.log(result)
      }
      return new ResponseService(
        true,
        result
          ? 'Consulta ejecutada correctamente.'
          : 'No se encontraron datos.',
        200,
        result,
      );
  }
}
