import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService, 
    private readonly jwtService:JwtService) { }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.getUserByEmail(registerDto.email)
    if(user) {
       throw new ConflictException('Email already exists')  }

    const saltRounds  = Number(process.env.SALT_ROUNDS) 
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds)
    registerDto.password = hashedPassword

    const createdUser = await this.userService.createUser(registerDto)

    const payload = { sub: createdUser.id, email: createdUser.email }
    const accessToken =await this.jwtService.signAsync(payload)

    return {
      accessToken
    }

  }
}
