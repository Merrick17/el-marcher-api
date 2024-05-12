import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Market extends Document {
  @Prop({ required: true })
  marketName: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  city: string;
}

export const MarketSchema = SchemaFactory.createForClass(Market);
