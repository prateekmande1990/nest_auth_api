import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }

    return user;
  }

  async createUser(registerDto: RegisterDto) {
    return this.prismaService.user.create({ data: registerDto });
  }
}
