import { Injectable } from '@nestjs/common';
import { BusinessException } from 'src/common/lib/business-exceptions';
import { IMessage } from 'src/core/entity/message.entity';
import { IMessageProvider } from '../../../data-provider/message.provider';
import { IMessageUc } from '../message.uc';


@Injectable()
export class MessageUcimpl implements IMessageUc {

    constructor(
        public readonly _messageProvider: IMessageProvider
    ) { }


    loadMessages(): Promise<IMessage[]> {
        throw new Error('Method not implemented.');
    }

    async update(message: IMessage): Promise<IMessage> {
        const result = await this._messageProvider.updateMessage(message);
        if (result == null)
            throw new BusinessException(400, 'No existe un mensaje con el código indicado', true);
        
        return result;
    }

    async getById(idMessage: string): Promise<IMessage> {
        return await this._messageProvider.getMessage(idMessage);
    }

    async getMessages(): Promise<IMessage[]> {
        return await this._messageProvider.getMessages();
    }


}