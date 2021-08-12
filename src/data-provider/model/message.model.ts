import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MessageModel extends Document{ 

    @Prop()
    id: string;

    @Prop()
    description: string;

    @Prop()
    message: string

}

export const MessageSchema = SchemaFactory.createForClass(MessageModel);
