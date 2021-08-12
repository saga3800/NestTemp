import { Injectable } from '@nestjs/common';
import { ResponseService } from 'src/controller/dto/response-service.dto';
import { ITraceabilityService } from '../traceability.service';
import { ITraceabilityDTO } from 'src/controller/dto/traceability/traceability.dto';
import { ITraceability } from 'src/core/entity/traceability.entity';
import { ITraceabilityUc } from 'src/core/use-case/traceability.uc';

@Injectable()
export class TraceabilityService implements ITraceabilityService {
  constructor(private readonly _traceabilityUC: ITraceabilityUc) {}

  async update(trace: ITraceabilityDTO): Promise<ResponseService<ITraceability>> {
    const result = await this._traceabilityUC.update(trace);
    return new ResponseService(
      true,
      'Trace actualizado correctamente.',
      200,
      result,
    );
  }

  async getById(processId: string): Promise<ResponseService<ITraceability>> {
    const result: ITraceability = await this._traceabilityUC.getById({ processId }, { not_allowed: 0 });
    return new ResponseService(
      true,
      result != null
        ? 'Consulta ejecutada correctamente.'
        : `No se encontró trace configurado con el processId "${processId}".`,
      200,
      result,
    );
  }

  async create(_data: ITraceabilityDTO): Promise<ResponseService> {
    const result = await this._traceabilityUC.create(_data);
    return new ResponseService(true, 'Trace creado correctamente', 200, result);
  }

  async getAll(page: number, limit: number, filter: any): Promise<ResponseService<any>> {
    // Mapeo de los campos de filtrado
    const _filter: object = JSON.parse(filter);

    const result = await this._traceabilityUC.getAll(page, limit, _filter);
    return new ResponseService(
      true,
      result
        ? 'Consulta ejecutada correctamente.'
        : 'No se encontraron mensajes configurados en la base de datos.',
      200,
      result,
    );
  }

  async delete(processId: string): Promise<ResponseService> {
    const result = await this._traceabilityUC.delete(processId);
    return new ResponseService(
      true,
      'Trace borrado correctamente.',
      200,
      result,
    );
  }
}
