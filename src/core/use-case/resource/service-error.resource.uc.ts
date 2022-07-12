import { Injectable } from '@nestjs/common';
import { IServiceError } from 'src/core/entity/service-error/service-error.entity';
import { ResponsePaginator } from 'src/controller/dto/response-paginator.dto';

@Injectable()
export abstract class IServiceErrorUc {

    abstract createServiceError(message: string, stack: string, request?: any, response?: any);
    abstract getServiceErrors(page: number, limit: number, filter: any): Promise<ResponsePaginator<IServiceError>>;
}