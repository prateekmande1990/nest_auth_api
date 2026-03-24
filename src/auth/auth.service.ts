import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService) { }

  register(registerDto: RegisterDto) {

    // 1 check email already exists
    // 2 hash password
    // 3 create user
    // 4 generate jwt token
    // 5 return jwt token

    const user = this.userService.getUserByEmail(registerDto.email)

    return user

  }
}
