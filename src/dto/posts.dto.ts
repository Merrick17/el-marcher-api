import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty

export class CreatePostDto {
  @ApiProperty({ description: 'The description of the post' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The ID of the associated market' })
  @ValidateNested()
  market: string; // Assuming market ID is stored as a string
}

export class UpdatePostDto {
  @ApiProperty({
    description: 'The description of the post (optional)',
    required: false,
  })
  @IsNotEmpty()
  description?: string;

  @ApiProperty({
    description: 'The ID of the associated market (optional)',
    required: false,
  })
  @ValidateNested()
  market?: string; // Assuming market ID is stored as a string
}
