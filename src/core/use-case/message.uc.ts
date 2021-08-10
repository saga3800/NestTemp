import { Injectable } from '@nestjs/common';
import { IMessage } from '../entity/message.entity';
@Injectable()
export abstract class IMessageUc {

    abstract loadMessages(): Promise<IMessage[]>;

    abstract update(message: IMessage): Promise<IMessage>;

    abstract getById(idMessage: string): Promise<IMessage>;

    abstract getMessages(): Promise<IMessage[]>;

}