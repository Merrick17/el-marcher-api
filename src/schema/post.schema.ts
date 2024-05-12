import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Market, MarketSchema } from './market.schema'; // Import the Market schema

@Schema({ timestamps: true })
export class MarketPost extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Market' }) // Use ref option with the name of the model
  market: ObjectId;

  @Prop({ required: true })
  description: string;
}

export const MarketPostSchema = SchemaFactory.createForClass(MarketPost);
