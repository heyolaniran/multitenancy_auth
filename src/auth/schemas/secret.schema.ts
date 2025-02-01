import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaType } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Secrets extends Document {
  @Prop({ required: true })
  jwtSecret: string;
}

export const SecretSchema = SchemaFactory.createForClass(Secrets);
