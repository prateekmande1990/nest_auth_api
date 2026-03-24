import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

  constructor() {}

  register(registerDto: RegisterDto) {

    return registerDto

  }
}
