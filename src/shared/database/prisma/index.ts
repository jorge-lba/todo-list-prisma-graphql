import { PrismaClient } from '@prisma/client';

class Database {
  private static _instance: Database;

  private _prisma: PrismaClient;

  private constructor() {
    this._prisma = new PrismaClient();
  }

  static get instance(): Database {
    if (!Database._instance) {
      Database._instance = new Database();
    }

    return Database._instance;
  }

  get prisma(): PrismaClient {
    return this._prisma;
  }

  disconnect(): void {
    this._prisma.$disconnect();
  }
}

export { Database };
