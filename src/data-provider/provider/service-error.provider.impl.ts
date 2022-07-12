import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IServiceError } from 'src/core/entity/service-error/service-error.entity';
import { ServiceErrorModel } from '../model/service-error/service-error.model';
import { IServiceErrorProvider } from '../service-error.provider';

@Injectable()
export class ServiceErrorProvider implements IServiceErrorProvider {

    constructor(
        @InjectModel(ServiceErrorModel.name) private readonly serviceErrorModel: Model<ServiceErrorModel>,
    ) { }

    async getTotal(filter: any): Promise<number> {
        return this.serviceErrorModel.countDocuments(filter);
    }

    async getServiceErrors( filter: any, projection: any = {}): Promise<IServiceError[]> {
        return this.serviceErrorModel.find(filter, projection)
    }

    async getServiceError(id: string): Promise<IServiceError> {
        return this.serviceErrorModel.findOne({ id });
    }

    async createServiceError(serviceError: IServiceError) {
        await this.serviceErrorModel.insertMany(serviceError);
    }

}