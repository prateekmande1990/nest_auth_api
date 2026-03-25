import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const { PrismaClient } = require('../generated/prisma/client') as {
  PrismaClient: new (options: {
    adapter: PrismaBetterSqlite3;
  }) => {
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
    user: {
      findUnique(args: { where: { email: string } }): Promise<unknown>;
    };
  };
};

type PrismaClientInstance = InstanceType<typeof PrismaClient>;

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly client: PrismaClientInstance = new PrismaClient({
    adapter: new PrismaBetterSqlite3({
      url: process.env.DATABASE_URL ?? 'file:./notes.db',
    }),
  });

  get user() {
    return this.client.user;
  }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
