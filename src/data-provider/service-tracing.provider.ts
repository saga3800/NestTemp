import { Injectable } from '@nestjs/common';
import { IServiceTracing } from 'src/core/entity/service-tracing/service-tracing.entity';
@Injectable()
export abstract class IServiceTracingProvider {

    abstract createServiceTracing(serviceTracing: IServiceTracing);

}