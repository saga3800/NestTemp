import { Injectable } from '@nestjs/common';
import { IMessageDTO } from '../../dto/message/message.dto';
import { IMessage } from '../../../core/entity/message.entity';
import { IMessageUc } from '../../../core/use-case/message.uc';
import { IMessageService } from '../message.service';
import { ResponseService } from 'src/controller/dto/response-service.dto';
import { EmessageMapping } from 'src/common/utils/enums/message.enum';
import { MessageUcimpl } from 'src/core/use-case/impl/message.uc.impl';
import { IGlobalValidateIService } from '../globalValidate.service';

@Injectable()
export class MessageService implements IMessageService {
  constructor(private readonly _messageUC: IMessageUc,  public readonly _GlobalValidate: IGlobalValidateIService,) { }


  async update(message: IMessageDTO): Promise<ResponseService<IMessage>> {
    const result = await this._messageUC.update(message);
    return new ResponseService(
      true,
      'Mensaje actualizado correctamente.',
      200,
      result,
    );
  }


  async getById(idMessage: string): Promise<ResponseService<IMessage>> {
    const result: IMessage = await this._messageUC.getById(idMessage);
    return new ResponseService(
      true,
      result != null
        ? 'Consulta ejecutada correctamente.'
        : `No se encontró mensaje configurado con el Id "${idMessage}".`,
      200,
      result,
    );
  }


  async getMessages(page: number, limit: number, filter: any, channel: string): Promise<ResponseService<any>> {

    //Se valida canal
    const validateChannel: boolean = await this._GlobalValidate.validateChannel(channel)
    console.log("Respuesta de validacion del canal :", JSON.stringify(validateChannel))
    
    // Mapeo de los campos de filtrado
    const _filter: object = JSON.parse(filter);

    const result = await this._messageUC.getMessages(page, limit, _filter);
    return new ResponseService(
      true,
      result
        ? 'Consulta ejecutada correctamente.'
        : 'No se encontraron datos.',
      200,
      result,
    );
  }

  public static mappingMessage(idMessage: EmessageMapping): string {
    return MessageUcimpl.getMessages.find(m => m.id == idMessage)?.message;
  }

}
