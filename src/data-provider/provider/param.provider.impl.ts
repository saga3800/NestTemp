import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IParam } from 'src/core/entity/param/param.entity';
import { ParamModel } from '../model/param/param.model';
import { IParamProvider } from '../param.provider';
import * as moment from 'moment';

@Injectable()
export class ParamProvider implements IParamProvider {

    constructor(
        @InjectModel(ParamModel.name) private readonly paramModel: Model<ParamModel>,
    ) { }

    async getTotal(filter: any): Promise<number> {
        return await this.paramModel.countDocuments(filter);
    }

    async getParams(page: number, limit: number, filter: any, projection: any = {}): Promise<IParam[]> {
        return await this.paramModel.find(filter, projection)
            .skip(limit * (page - 1))
            .limit(limit);
    }

    async getParamByIdParam(id_param: string): Promise<IParam> {
        return await this.paramModel.findOne({ id_param });
    }


    async createParams(param: IParam[]): Promise<boolean> {
        param.forEach(element => {
            element.createdUser = 'admin'; // Pendiente de captura del usuario por sistema.
            element.updatedUser = 'admin'; // Pendiente de captura del usuario por sistema.
            element.createdAt = moment().format();
            element.updatedAt = moment().format();
        });

        await this.paramModel.insertMany(param);
        return true;
    }

    async updateParam(param: IParam): Promise<IParam> {

        const result = await this.paramModel.findOneAndUpdate(
            {
                id_param: param.id_param,
            },
            {
                $set: {
                    id_param: param.id_param,
                    description: param.description,
                    status: param.status,
                    updatedUser: 'admin', // Pendiente de captura del usuario por sistema.
                    updatedAt: moment().format(),
                    values: param.values,

                }
            },
            {
                new: true
            }
        );

        return result;
    }
}