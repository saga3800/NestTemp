import { Injectable } from '@nestjs/common';
import { IServiceTracing } from 'src/core/entity/service-tracing/service-tracing.entity';
import { IServiceTracingProvider } from 'src/data-provider/service-tracing.provider';
import { IServiceTracingUc } from '../service-tracing.resource.uc';

@Injectable()
export class ServiceTracingUcimpl implements IServiceTracingUc {

    constructor(
        private readonly _serviceTracingProvider: IServiceTracingProvider
    ) { }

    async createServiceTracing(serviceTracing: IServiceTracing) {
        this._serviceTracingProvider.createServiceTracing(serviceTracing);
    }

}
