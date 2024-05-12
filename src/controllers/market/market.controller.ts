import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateMarketDto,
  DeleteMarketResDto,
  GetAllMarketsResDto,
  GetMarketResDto,
  UpdateMarketDto,
} from 'src/dto/market.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

import { MarketService } from 'src/services/market/market.service';
@UseGuards(AuthGuard)
@Controller('markets')
@ApiTags('Markets')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new market' })
  @ApiResponse({
    status: 201,
    description: 'Market created successfully',
    type: GetMarketResDto,
  })
  async createMarket(
    @Body() CreateMarketDto: CreateMarketDto,
  ): Promise<GetMarketResDto> {
    try {
      const resp = await this.marketService.createMarket(CreateMarketDto);
      return { success: true, market: resp };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all markets' })
  @ApiResponse({
    status: 200,
    description: 'Returns all markets',
    type: GetAllMarketsResDto,
  })
  async getAllMarkets(): Promise<GetAllMarketsResDto> {
    try {
      const resp = await this.marketService.getAllMarkets();
      return {
        success: true,
        marketList: resp,
      };
    } catch (error) {
      return {
        error: error.message,
        success: true,
      };
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a market by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the market',
    type: GetMarketResDto,
  })
  @ApiNotFoundResponse({ description: 'Market not found' })
  async getMarketById(@Param('id') id: string): Promise<GetMarketResDto> {
    try {
      const resp = await this.marketService.getMarketById(id);
      return {
        success: true,
        market: resp,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a market by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated market',
    type: GetMarketResDto,
  })
  @ApiNotFoundResponse({ description: 'Market not found' })
  async updateMarket(
    @Param('id') id: string,
    @Body() body: UpdateMarketDto,
  ): Promise<GetMarketResDto> {
    try {
      const resp = await this.marketService.updateMarket(id, body);
      return {
        success: true,
        market: resp,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a market by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the deleted market',
    type: DeleteMarketResDto,
  })
  @ApiNotFoundResponse({ description: 'Market not found' })
  async deleteMarket(@Param('id') id: string): Promise<DeleteMarketResDto> {
    try {
      const resp = await this.marketService.deleteMarket(id);
      return { success: true, message: 'Market Deleted' };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
