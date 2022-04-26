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
        return await this.serviceErrorModel.countDocuments(filter);
    }

    async getServiceErrors(page: number, limit: number, filter: any, projection: any = {}): Promise<IServiceError[]> {
        return await this.serviceErrorModel.find(filter, projection)
            .skip(limit * (page - 1))
            .limit(limit);
    }


    async getServiceError(id: string): Promise<IServiceError> {
        return await this.serviceErrorModel.findOne({ id });
    }


    async createServiceError(serviceError: IServiceError) {
            await this.serviceErrorModel.insertMany(serviceError);
        
    }


    // async updateServiceError(serviceError: IServiceError): Promise<IServiceError> {

    //     const result = await this.serviceErrorModel.findOneAndUpdate(
    //         {
    //             id: serviceError.id,
    //         },
    //         {
    //             $set: {
    //                 id: serviceError.id,
    //                 temp: serviceError.temp
    //             }
    //         },
    //         {
    //             new: true
    //         }
    //     );

    //     return result;
    // }

}