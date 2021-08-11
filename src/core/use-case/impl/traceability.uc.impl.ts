import { Injectable } from '@nestjs/common';
import { BusinessException } from 'src/common/lib/business-exceptions';
import { ResponsePaginator } from 'src/controller/dto/response-paginator.dto';
import { ITraceability } from 'src/core/entity/traceability.entity';
import { ITraceabilityProvider } from 'src/data-provider/traceability.provider';
import { ITraceabilityUc } from '../traceability.uc';

@Injectable()
export class TraceabilityUcimpl implements ITraceabilityUc {
  constructor(public readonly _traceabilityProvider: ITraceabilityProvider) {}

  async create(data: ITraceability): Promise<any> {
    //Se valida si existe un trace con el mismo processId
    const exist = await this._traceabilityProvider.getById(
      { processId: data.processId },
      { "processId": 1 },
    );

    if (exist)
      throw new BusinessException(
        400,
        'Ya existe un trace con este processId',
        true,
      );

    return this._traceabilityProvider.create(data);
  }

  async update(trace: ITraceability): Promise<ITraceability> {
    const result = await this._traceabilityProvider.updateTrace(trace);
    if (result == null)
      throw new BusinessException(
        400,
        'No existe un trace con el código indicado',
        true,
      );

    return result;
  }

  async getById(processId: object, projection: any = {}): Promise<ITraceability> {
      return await this._traceabilityProvider.getById(processId, projection);
  }

  async getAll(
    page: number,
    limit: number,
    filter: any,
  ): Promise<ResponsePaginator<ITraceability>> {
    if (filter != {}) {
      const total: number = await this._traceabilityProvider.getTotal(filter);
      if (total == 0)
        throw new BusinessException(
          400,
          'No se encontró información con los filtros indicados',
        );
    }

    const documents = await this._traceabilityProvider.getAll(
      page,
      limit,
      filter,
    );

    return new ResponsePaginator(documents, page, limit);
  }

  async delete(processId: string): Promise<ITraceability> {
    return await this._traceabilityProvider.delete(processId);
  }
}
