import { Injectable } from '@nestjs/common';
import { IParam } from 'src/core/entity/param/param.entity';

@Injectable()
export abstract class IParamProvider {

    abstract createParams(params: IParam[]): Promise<boolean>;

    abstract getParams(page: number, limit: number, filter: any): Promise<IParam[]>;

    abstract getTotal(filter: any): Promise<number>;

    abstract getParamByIdParam(id_param: string): Promise<IParam>;

    abstract updateParam(param: IParam): Promise<IParam>;

}