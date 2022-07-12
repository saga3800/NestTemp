import { Injectable } from '@nestjs/common';
import { IServiceError } from 'src/core/entity/service-error/service-error.entity';
import { ResponseService } from '../dto/response-service.dto';

@Injectable()
export abstract class IServiceErrorService {
  abstract createServiceError(message: string, stack: string, request?: any, response?: any);

  abstract getServiceErrors(page: number, limit: number, filter: any): Promise<ResponseService>;
}
