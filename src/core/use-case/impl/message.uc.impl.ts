import { Injectable } from '@nestjs/common';
import { BusinessException } from 'src/common/lib/business-exceptions';
import { ResponsePaginator } from 'src/controller/dto/response-paginator.dto';
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

    async getMessages(page: number, limit: number, filter: any): Promise<ResponsePaginator<IMessage>> {
        if (filter != {}) {
            const total: number = await this._messageProvider.getTotal(filter);
            if (total == 0)
               throw new BusinessException(400, 'No se encontró información con los filtros indicados');
        }
   
        const documents = await this._messageProvider.getMessages(
            page,
            limit,
            filter
        );
   
        return new ResponsePaginator(documents, page, limit);
    }

}