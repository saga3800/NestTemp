import { Injectable } from '@nestjs/common';
import { ResponsePaginator } from 'src/controller/dto/response-paginator.dto';

@Injectable()
export abstract class IHttpPruebaUc {

    abstract getById(_id: string): Promise<any>;

    abstract getAll(page: number, limit: number): Promise<any>;
    
}