import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMarketDto } from 'src/dto/market.dto';
import { Market } from 'src/schema/market.schema';
import { MarketPost } from 'src/schema/post.schema';

@Injectable()
export class MarketService {
  constructor(
    @InjectModel(Market.name) private marketModel: Model<Document>,
    @InjectModel(MarketPost.name) private readonly postModel: Model<Document>,
  ) {}

  async createMarket(marketDto: CreateMarketDto): Promise<Market> {
    const newMarket = new this.marketModel(marketDto);
    const market = await newMarket.save();
    return market.toObject();
  }

  async getAllMarkets(): Promise<Market[]> {
    const list: Market[] = await this.marketModel.find();
    return list;
  }
  async getAllMarketsWithProducts(): Promise<any> {
    const marketList: Market[] = await this.marketModel.find().lean();
    const combinedList = await Promise.all(
      marketList.map(async (market) => {
        const products = await this.postModel.find({ market: market._id });
        return {
          ...market,
          products,
        };
      }),
    );
    return combinedList;
  }

  async getMarketById(id: string): Promise<Market> {
    const market: Market = await this.marketModel.findById(id);
    if (!market) {
      throw new NotFoundException('Market not found');
    }
    return market;
  }

  async updateMarket(id: string, marketData: Partial<Market>): Promise<Market> {
    const updatedMarket: Market = await this.marketModel.findByIdAndUpdate(
      id,
      marketData,
      { new: true },
    );
    if (!updatedMarket) {
      throw new NotFoundException('Market not found');
    }
    return updatedMarket;
  }

  async deleteMarket(id: string): Promise<Market> {
    const deletedMarket: Market = await this.marketModel.findByIdAndDelete(id);
    if (!deletedMarket) {
      throw new NotFoundException('Market not found');
    }
    return deletedMarket;
  }
}
