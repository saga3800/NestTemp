import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IHttpPruebaUc {

    abstract getById(_id: string): Promise<any>;
    
}