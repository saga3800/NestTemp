import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IServiceTracing } from 'src/core/entity/service-tracing/service-tracing.entity';
import { ServiceTracingModel } from '../model/service-tracing/service-tracing.model';
import { IServiceTracingProvider } from '../service-tracing.provider';

@Injectable()
export class ServiceTracingProvider implements IServiceTracingProvider {

    constructor(
        @InjectModel(ServiceTracingModel.name) private readonly serviceTracingModel: Model<ServiceTracingModel>,
    ) { }

    async createServiceTracing(serviceTracing: IServiceTracing) {
        await this.serviceTracingModel.insertMany(serviceTracing);
    }

}