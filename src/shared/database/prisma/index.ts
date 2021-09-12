import { PrismaClient } from '@prisma/client'

class Database {
  private static _instance: Database

  private _prisma: PrismaClient

  private constructor() {
    this._prisma = new PrismaClient()
  }

  static get instance() {
    if (!Database._instance) {
      Database._instance = new Database()
    }

    return Database._instance
  }

  get prisma() {
    return this._prisma
  }

  disconnect() {
    this._prisma.$disconnect()
  }
}

export { Database }