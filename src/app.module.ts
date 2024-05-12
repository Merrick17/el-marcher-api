import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URL, TOKEN_SECRET } from './contants/constants';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './services/auth/auth.service';

import { AuthController } from './controllers/auth/auth.controller';
import { MarketService } from './services/market/market.service';
import { MarketController } from './controllers/market/market.controller';
import { Market, MarketSchema } from './schema/market.schema';
import { MarketPost, MarketPostSchema } from './schema/post.schema';
import { PostService } from './services/posts/posts.service';
import { PostsController } from './controllers/posts/posts.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || DB_URL),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Market.name,
        schema: MarketSchema,
      },
      {
        schema: MarketPostSchema,
        name: MarketPost.name,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: TOKEN_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [
    AppController,
    AuthController,
    MarketController,
    PostsController,
  ],
  providers: [AppService, UserService, MarketService, PostService],
})
export class AppModule {}
