import { Injectable } from '@nestjs/common';
import { IServiceError } from 'src/core/entity/service-error/service-error.entity';
import { ResponseService } from '../dto/response-service.dto';

@Injectable()
export abstract class IServiceErrorService {
  abstract createServiceError(serviceError: IServiceError);

  abstract getServiceErrors(page: number, limit: number, filter: any): Promise<ResponseService>;
}
