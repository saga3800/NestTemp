import { Injectable } from '@nestjs/common';
import { ResponsePaginator } from 'src/controller/dto/response-paginator.dto';
import { ITraceability } from '../entity/traceability.entity';

@Injectable()
export abstract class ITraceabilityUc {

    abstract create(data: ITraceability): Promise<any>;

    abstract update(trace: ITraceability): Promise<ITraceability>;

    abstract delete(processId: string): Promise<ITraceability>;

    abstract getById(processId: object, projection: object): Promise<ITraceability>;

    abstract getAll(page: number, limit: number, filter: any): Promise<ResponsePaginator<ITraceability>>;

}