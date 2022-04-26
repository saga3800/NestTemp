import { Injectable } from '@nestjs/common';
import { IServiceError } from 'src/core/entity/service-error/service-error.entity';

@Injectable()
export abstract class IServiceErrorProvider {

    abstract createServiceError(ServiceErrors: IServiceError);

    abstract getServiceErrors(page: number, limit: number, filter: any): Promise<IServiceError[]>;

    abstract getTotal(filter: any): Promise<number>

    abstract getServiceError(id: string): Promise<IServiceError>;

    //abstract updateServiceError(message: IServiceError): Promise<IServiceError>;

}