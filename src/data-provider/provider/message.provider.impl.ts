import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage } from 'src/core/entity/message.entity';
import { IMessageProvider } from '../message.provider';
import { MessageModel } from '../model/message.model';

@Injectable()
export class MessageProvider implements IMessageProvider {

    constructor(
        @InjectModel(MessageModel.name) private readonly messageModel: Model<MessageModel>,
    ) { }


    async getTotal(filter: any): Promise<number> {
        return await this.messageModel.countDocuments(filter);
    }
    
    async getMessages(page: number, limit: number, filter: any, projection: any = {}): Promise<IMessage[]> {
        return await this.messageModel.find(filter, projection)
            .skip(limit * (page - 1))
            .limit(limit);
    }


    async getMessage(id: string): Promise<IMessage> {
        return await this.messageModel.findOne({ id });
    }


    async createMessages(messages: IMessage[]): Promise<boolean> {

        await this.messageModel.insertMany(messages);
        return true;
    }


    async updateMessage(message: IMessage): Promise<IMessage> {

       const result = await this.messageModel.findOneAndUpdate(
            {
                id: message.id,
            },
            {
                $set: {
                    id: message.id,
                    description: message.description,
                    message: message.message
                }
            },
           {
               new: true
           }
        );

        return result;
    }

}