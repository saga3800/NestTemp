import { Injectable } from '@nestjs/common';
import { BusinessException } from 'src/common/lib/business-exceptions';
import { ResponsePaginator } from 'src/controller/dto/response-paginator.dto';
import { IMessage } from 'src/core/entity/message.entity';
import { IMessageProvider } from '../../../data-provider/message.provider';
import { IMessageUc } from '../message.uc';
import { MESSAGE } from 'src/common/configuration/messages/message-config';
import Logging from 'src/common/lib/logging';
import { Etask } from 'src/common/utils/enums/taks.enum';


@Injectable()
export class MessageUcimpl implements IMessageUc {

    static messages: IMessage[] = [];
    private readonly logger = new Logging(MessageUcimpl.name);

    constructor(
        public readonly _messageProvider: IMessageProvider
    ) { }


    async loadMessages(): Promise<any> {
        let message: IMessage[] = [];
        try {
            message = await this._messageProvider.getMessages(1, 100, {});
            if (message.length == 0) { 
                // Si no hay mensajes en bd, se insertan los mensajes
                await this._messageProvider.createMessages(MESSAGE);
            }
        } catch(error) {
            this.logger.write(`Error cargando mensajes`, Etask.LOAD_MESSAGE, true, error);
        } finally {
            // Actualizar variable estática
            MessageUcimpl.messages = (message.length == 0) ? MESSAGE: message;
        }
    }

    async update(message: IMessage): Promise<IMessage> {
        const result = await this._messageProvider.updateMessage(message);
        if (result == null)
            throw new BusinessException(400, 'No existe un mensaje con el código indicado', true);
        
        // Si se actualiza en bd, actualizar variable estática
        const messagePosition = MessageUcimpl.messages.findIndex(msg => msg.id === message.id);
        MessageUcimpl.messages[messagePosition] = message;

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