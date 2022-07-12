import { Injectable } from '@nestjs/common';
import { IServiceError } from 'src/core/entity/service-error/service-error.entity';
import { ResponsePaginator } from 'src/controller/dto/response-paginator.dto';
import { ITaskError } from 'src/core/entity/service-error/task-error.entity';

@Injectable()
export abstract class IServiceErrorUc {

    // abstract getServiceErrors(page: number, limit: number, filter: any): Promise<ResponsePaginator<IServiceError>>;
    abstract createServiceError(error: any, task: ITaskError);
    abstract getServiceErrors( filter: any)
}