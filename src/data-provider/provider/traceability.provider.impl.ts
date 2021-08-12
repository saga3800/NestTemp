import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITraceability } from 'src/core/entity/traceability.entity';
import { TraceabilityModel } from '../model/traceability.model';
import { ITraceabilityProvider } from '../traceability.provider';

@Injectable()
export class TraceabilityProvider implements ITraceabilityProvider {
  constructor(
    @InjectModel(TraceabilityModel.name)
    private readonly traceModel: Model<TraceabilityModel>,
  ) {}

  async create(data: ITraceability): Promise<ITraceability> {
    const trace = new this.traceModel(data);
    const result = await trace.save();
    return result;
  }

  async getById(processId: object, projection: any): Promise<ITraceability> {
    const result = await this.traceModel.findOne(processId, projection);
    return result;
  }

  async getTotal(filter: any): Promise<number> {
    return await this.traceModel.countDocuments(filter);
  }

  async getAll(
    page: number,
    limit: number,
    filter: any,
    projection: any = {},
  ): Promise<ITraceability[]> {
    return await this.traceModel
      .find(filter, projection)
      .skip(limit * (page - 1))
      .limit(limit);
  }

  async updateTrace(trace: ITraceability): Promise<ITraceability> {
    const result = await this.traceModel.findOneAndUpdate(
      {
        processId: trace.processId,
      },
      {
        $set: {
          processId: trace.processId,
          task: trace.task,
          responseCode: trace.responseCode,
        },
      },
      {
        new: true,
      },
    );

    return result;
  }

  async delete(processId: string): Promise<ITraceability> {
    const result = await this.traceModel.findOneAndDelete({ processId });
    return result;
  }
}
