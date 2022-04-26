import { Injectable } from '@nestjs/common';
import { ResponsePaginator } from 'src/controller/dto/response-paginator.dto';
import { IParam } from 'src/core/entity/param/param.entity';

@Injectable()
export abstract class IParamUc {

    abstract loadParams(): Promise<IParam[]>;

}