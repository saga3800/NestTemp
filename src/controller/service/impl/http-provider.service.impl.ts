import { Injectable } from '@nestjs/common';
import { ResponseService } from 'src/controller/dto/response-service.dto';
import { IHttpPruebaUc } from 'src/core/use-case/http-prueba.uc';
import { IHttpPruebaService } from '../http-prueba.service';

@Injectable()
export class HttpPruebaService implements IHttpPruebaService {
  constructor(private readonly _httpPruebaUc: IHttpPruebaUc) {}

  async getById(_id: string): Promise<ResponseService<any>> {
    const result = await this._httpPruebaUc.getById(_id);
    return new ResponseService(
        true,
        'Acción realizada correctamente.',
        200,
        result,
    );
  }
}
