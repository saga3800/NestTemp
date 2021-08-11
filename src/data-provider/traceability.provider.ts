import { Injectable } from '@nestjs/common';
import { ITraceability } from 'src/core/entity/traceability.entity';

@Injectable()
export abstract class ITraceabilityProvider {

    abstract create(data: ITraceability): Promise<ITraceability>;

    abstract getAll(page: number, limit: number, filter: any): Promise<ITraceability[]>;

    abstract getTotal(filter: any): Promise<number>

    abstract getById(processId: object, projection: any): Promise<ITraceability>;

    abstract updateTrace(trace: ITraceability): Promise<ITraceability>;

    abstract delete(processId: string): Promise<ITraceability>;

}