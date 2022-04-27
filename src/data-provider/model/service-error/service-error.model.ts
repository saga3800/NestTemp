import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Documentos extends Document {
    @Prop()
    error: string;

    @Prop({default:""})
    request: string;

    @Prop({default:""})
    response: string;
}

@Schema({ versionKey: false, timestamps: true })
export class ServiceErrorModel extends Document {
    @Prop({default: false})
    success: boolean;

    @Prop()
    origen: string;

    @Prop()
    message: string;

    @Prop()
    serviceid: string;

    @Prop({ type: Documentos })
    documents: Documentos;
}

export const ServiceErrorSchema =  SchemaFactory.createForClass(ServiceErrorModel);
