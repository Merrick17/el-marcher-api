import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<Document>) {}

  async registerUser(phoneNumber: string, password: string): Promise<User> {
    const existingUser = await this.userModel.findOne({ phoneNumber });
    if (existingUser) {
      throw new BadRequestException(
        'User already exists with this phone number',
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      phoneNumber,
      password: hashedPassword,
    });
    const user = await newUser.save();
    return user.toObject();
  }

  async authenticateUser(phoneNumber: string, password: string): Promise<User> {
    const user: User = await this.userModel.findOne({ phoneNumber });

    if (!user) {
      throw new UnauthorizedException('Wrong email or password');
    } else {
      const verify = await bcrypt.compare(password, user.password);
      if (!verify) {
        throw new UnauthorizedException('Wrong email or password');
      } else {
        return user;
      }
    }
  }
}
