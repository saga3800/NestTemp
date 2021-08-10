import { Injectable } from '@nestjs/common';
import { IMessageDTO } from '../dto/message/message.dto';
import { ResponseService } from '../dto/response-service.dto';

@Injectable()
export abstract class IMessageService {

    abstract update(message: IMessageDTO): Promise<ResponseService>;

    abstract getById(idMessage: string): Promise<ResponseService>;

    abstract getMessages(): Promise<ResponseService>;

}