import { Injectable } from '@nestjs/common';
import { IServiceError } from 'src/core/entity/service-error/service-error.entity';

@Injectable()
export abstract class IServiceErrorProvider {

    abstract createServiceError(ServiceErrors: IServiceError);
    abstract getServiceErrors( filter: any): Promise<IServiceError[]>;
    abstract getTotal(filter: any): Promise<number>
    abstract getServiceError(id: string): Promise<IServiceError>;

}