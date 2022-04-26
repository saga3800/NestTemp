import { Injectable } from '@nestjs/common';
import { IServiceError } from 'src/core/entity/service-error/service-error.entity';
import { ResponsePaginator } from 'src/controller/dto/response-paginator.dto';

@Injectable()
export abstract class IServiceErrorUc {

    abstract createServiceError(serviceError: IServiceError);
    abstract getServiceErrors(page: number, limit: number, filter: any): Promise<ResponsePaginator<IServiceError>>;
}