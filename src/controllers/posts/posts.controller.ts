import {
  Controller,
  UseGuards,
  Param,
  Post,
  Get,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'; // Import the decorators
import { CreatePostDto, UpdatePostDto } from 'src/dto/posts.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { MarketPost } from 'src/schema/post.schema';
import { PostService } from 'src/services/posts/posts.service';

@UseGuards(AuthGuard)
@Controller('posts')
@ApiTags('Posts') // Add the API tag for the controller
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  async create(@Body() createPostDto: CreatePostDto): Promise<MarketPost> {
    return await this.postService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Return all posts.' })
  async findAll(): Promise<MarketPost[]> {
    return await this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiResponse({ status: 200, description: 'Return the post.' })
  async findOne(@Param('id') id: string): Promise<MarketPost | null> {
    return await this.postService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiResponse({ status: 200, description: 'Return the updated post.' })
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<MarketPost | null> {
    return await this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiResponse({ status: 200, description: 'Return the deleted post.' })
  async remove(@Param('id') id: string): Promise<MarketPost | null> {
    return await this.postService.remove(id);
  }
}
