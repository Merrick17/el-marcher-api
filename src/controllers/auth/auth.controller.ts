import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AuthenticateUserDto,
  AuthenticateUserResDto,
  RegisterUserDto,
} from 'src/dto/user.dto';
import { UserService } from 'src/services/auth/auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: AuthenticateUserResDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request or user already exists' })
  async registerUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<AuthenticateUserResDto> {
    try {
      const resp = await this.userService.registerUser(
        registerUserDto.phoneNumber,
        registerUserDto.password,
      );
      const token = this.jwtService.sign({ userId: resp._id });
      return {
        success: true,
        token: token,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Post('auth')
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiResponse({
    status: 200,
    description: 'User authenticated successfully',
    type: AuthenticateUserResDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  async authenticateUser(
    @Body() authenticateUserDto: AuthenticateUserDto,
  ): Promise<AuthenticateUserResDto> {
    try {
      const resp = await this.userService.authenticateUser(
        authenticateUserDto.phoneNumber,
        authenticateUserDto.password,
      );
      const token = this.jwtService.sign({ userId: resp._id });
      return {
        success: true,
        token: token,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
