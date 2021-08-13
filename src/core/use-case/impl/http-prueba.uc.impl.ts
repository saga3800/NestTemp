import { Injectable } from '@nestjs/common';
import { BusinessException } from 'src/common/lib/business-exceptions';
import { ResponsePaginator } from 'src/controller/dto/response-paginator.dto';
import { IHttpPruebaProvider } from 'src/data-provider/http-prueba.provider';
import { IHttpPruebaUc } from '../http-prueba.uc';

@Injectable()
export class HttpPruebaUcimpl implements IHttpPruebaUc {
  constructor(public readonly _httpPruebaProvider: IHttpPruebaProvider) {}

  async getById(_id: string): Promise<any> {
    await this._httpPruebaProvider.getById(_id);
  }

  async getAll(page: number, limit: number): Promise<any> {
    const documents = await this._httpPruebaProvider.getAll(page, limit);
  }
}
