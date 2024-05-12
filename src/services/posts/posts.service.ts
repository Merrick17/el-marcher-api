import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto, UpdatePostDto } from 'src/dto/posts.dto';
import { MarketPost } from 'src/schema/post.schema';
import { MarketService } from '../market/market.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(MarketPost.name) private readonly postModel: Model<Document>,
    private marketServ: MarketService,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<MarketPost> {
    const market = await this.marketServ.getMarketById(createPostDto.market);
    console.log('POST DTO', market);
    const dataToStore: CreatePostDto = {
      market: market._id,
      description: createPostDto.description,
    };
    const newPost = new this.postModel(dataToStore);
    const savedPost = await newPost.save();
    return savedPost.toObject();
  }

  async findAll(): Promise<MarketPost[]> {
    const marketPosts: MarketPost[] = await this.postModel
      .find()
      .populate('market')
      .lean(); // Populate market data
    return marketPosts;
  }

  async findOne(id: string): Promise<MarketPost | null> {
    const marketPost = await this.postModel.findById(id).populate('market'); // Populate market data
    return marketPost.toObject();
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<MarketPost | null> {
    const marketPost = await this.postModel.findByIdAndUpdate(
      id,
      updatePostDto,
      {
        new: true,
      },
    );
    return marketPost.toObject();
  }

  async remove(id: string): Promise<MarketPost | null> {
    const marketPost = await this.postModel.findByIdAndDelete(id);
    return marketPost.toObject();
  }
}
