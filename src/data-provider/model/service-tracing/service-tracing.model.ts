import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class ServiceTracingModel extends Document {

    @Prop()
    status: string;

    @Prop()
    origen: string;

    @Prop()
    task: string;

    @Prop()
    description: string;
}

export const ServiceTracingSchema =  SchemaFactory.createForClass(ServiceTracingModel);