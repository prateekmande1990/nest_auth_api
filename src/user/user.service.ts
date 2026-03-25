import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByEmail(email: string) {
    console.log(email);
    const user = this.prismaService.user.findUnique({ where: { email } });
    if(!user ){
      return null
    }

    return user
  }
}
