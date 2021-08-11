import { Injectable } from '@nestjs/common';
import { ResponseService } from '../dto/response-service.dto';
import { ITraceabilityDTO } from '../dto/traceability/traceability.dto';

@Injectable()
export abstract class ITraceabilityService {

    abstract getById(processId: string): Promise<ResponseService>;

    abstract create(_data: ITraceabilityDTO): Promise<ResponseService>;

    abstract getAll(page: number, limit: number, filter: any): Promise<ResponseService>;

    abstract update(trace: ITraceabilityDTO): Promise<ResponseService>;

    abstract delete(processId: string): Promise<ResponseService>;

}