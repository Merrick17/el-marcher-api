import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ description: 'User phone number' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty()
  @IsString()
  password: string;
  @ApiProperty({ description: 'User Role' })
  @IsNotEmpty()
  @IsString()
  isAdmin: boolean;
}

export class AuthenticateUserDto {
  @ApiProperty({ description: 'User phone number' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class AuthenticateUserResDto {
  @ApiProperty({ description: 'JWT token for authentication' })
  token?: string;

  @ApiProperty({
    description: 'Flag indicating if authentication was successful',
  })
  success: boolean;

  @ApiProperty({
    description: 'Error message in case of authentication failure',
  })
  error?: string;
}
