import { Injectable } from '@nestjs/common';
import { ResponsePaginator } from 'src/controller/dto/response-paginator.dto';
import { IMessage } from '../entity/message.entity';
@Injectable()
export abstract class IMessageUc {

    abstract loadMessages(): Promise<IMessage[]>;

    abstract update(message: IMessage): Promise<IMessage>;

    abstract getById(idMessage: string): Promise<IMessage>;

    abstract getMessages(page: number, limit: number, filter: any): Promise<ResponsePaginator<IMessage>>;

}