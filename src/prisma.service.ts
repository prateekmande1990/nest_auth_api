import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import type { PrismaClient as GeneratedPrismaClient } from '../generated/prisma/client';

const { PrismaClient } = require('../generated/prisma/client') as {
  PrismaClient: new (options: {
    adapter: PrismaBetterSqlite3;
  }) => GeneratedPrismaClient;
};

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly client: GeneratedPrismaClient = new PrismaClient({
    adapter: new PrismaBetterSqlite3({
      url: process.env.DATABASE_URL ?? 'file:./notes.db',
    }),
  });

  get user(): GeneratedPrismaClient['user'] {
    return this.client.user;
  }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
