import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ versionKey: false, timestamps: true })
export class ServiceErrorModel extends Document {
    @Prop()
    origen: string;

    @Prop()
    message: string;

    @Prop()
    stack: string;

    @Prop()
    channel: string;

    @Prop({ type: Object, default: {} })
    request: any;
}

export const ServiceErrorSchema =  SchemaFactory.createForClass(ServiceErrorModel);
