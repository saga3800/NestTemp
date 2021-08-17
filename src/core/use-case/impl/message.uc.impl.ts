import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { BusinessException } from 'src/common/lib/business-exceptions';
import GeneralUtil from 'src/common/utils/utils';
import { Cache } from "cache-manager";
import { ResponsePaginator } from 'src/controller/dto/response-paginator.dto';
import { IMessage } from 'src/core/entity/message.entity';
import { IMessageProvider } from '../../../data-provider/message.provider';
import { IMessageUc } from '../message.uc';
import { MESSAGE } from 'src/common/configuration/messages/message-config';


@Injectable()
export class MessageUcimpl implements IMessageUc {

    private static messages: IMessage[];

    constructor(
        @Inject(CACHE_MANAGER) public readonly cacheManager: Cache,
        public readonly _messageProvider: IMessageProvider
    ) { }


    async loadMessages(): Promise<IMessage[]> {
        try {
            //Se valida si existe la colección de mensajes y si tiene datos
            const totalMessages = await this._messageProvider.getTotal({});
            if (totalMessages == 0) {
                // Si no hay mensajes en bd, se crean los mensajes por defecto
                const result = await this._messageProvider.createMessages(MESSAGE);
                if (result) {
                    // Si se guarda en bd, guardar también en cache
                    GeneralUtil.cacheMessages(this.cacheManager, 'create', MESSAGE);
                    return MESSAGE;
                }
            }
        } catch (error) {

        }
        finally {
            MessageUcimpl.messages = MESSAGE;
        }
    }

    async update(message: IMessage): Promise<IMessage> {
        const result = await this._messageProvider.updateMessage(message);
        if (result == null)
            throw new BusinessException(400, 'No existe un mensaje con el código indicado', true);

        // Si se actualiza en bd, también en cache
        GeneralUtil.cacheMessages(this.cacheManager, 'update', undefined, message);
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