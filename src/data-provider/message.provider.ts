import { Injectable } from '@nestjs/common';
import { IMessage } from 'src/core/entity/message.entity';

@Injectable()
export abstract class IMessageProvider {

    abstract createMessages(messages: IMessage[]): Promise<boolean>;

    abstract getMessages(): Promise<IMessage[]>;

    abstract getMessage(id: string): Promise<IMessage>;

    abstract updateMessage(message: IMessage): Promise<IMessage>;

}