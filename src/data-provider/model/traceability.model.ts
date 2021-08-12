import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TraceabilityModel extends Document{ 

    @Prop({ unique: true })
    processId: string;

    @Prop()
    task: string;

    @Prop()
    responseCode: number;

}

export const TraceabilitySchema = SchemaFactory.createForClass(TraceabilityModel);