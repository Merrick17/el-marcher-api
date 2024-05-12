import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateMarketDto {
  @ApiProperty({ description: 'Market name' })
  @IsNotEmpty()
  @IsString()
  marketName: string;

  @ApiProperty({ description: 'State where the market is located' })
  @IsNotEmpty()
  @IsString()
  state: string;
  @ApiProperty({
    description: 'City where the market is located',
  })
  @IsNotEmpty()
  @IsString()
  city?: string;
}

export class UpdateMarketDto {
  @ApiProperty({ description: 'Market name' })
  @IsString()
  marketName?: string;

  @ApiProperty({ description: 'State where the market is located' })
  @IsString()
  state?: string;

  @ApiProperty({
    description: 'City where the market is located',
  })
  @IsNotEmpty()
  @IsString()
  city?: string;
}

export interface Market {
  marketName: string;

  state: string;

  city: string;
}

export class GetAllMarketsResDto {
  @ApiProperty({
    description: 'Flag indicating if the operation was successful',
  })
  success?: boolean;

  @ApiProperty({ description: 'List of markets' })
  marketList?: Market[];

  @ApiProperty({ description: 'Error message in case of failure' })
  error?: string;
}

export class GetMarketResDto {
  @ApiProperty({
    description: 'Flag indicating if the operation was successful',
  })
  success?: boolean;

  @ApiProperty({ description: 'Market details' })
  market?: Market;

  @ApiProperty({ description: 'Error message in case of failure' })
  error?: string;
}

export class UpdateMarketResDto {
  @ApiProperty({
    description: 'Flag indicating if the operation was successful',
  })
  success?: boolean;

  @ApiProperty({ description: 'Updated market details' })
  market?: Market;

  @ApiProperty({ description: 'Error message in case of failure' })
  error?: string;
}

export class DeleteMarketResDto {
  @ApiProperty({
    description: 'Flag indicating if the operation was successful',
  })
  success?: boolean;

  @ApiProperty({ description: 'Error message in case of failure' })
  error?: string;

  @ApiProperty({ description: 'Success message in case of deletion' })
  message?: string;
}
