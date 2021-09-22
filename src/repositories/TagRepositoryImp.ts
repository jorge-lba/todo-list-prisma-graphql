import { Prisma, PrismaClient, tag } from ".prisma/client";
import { Database } from "../shared/database/prisma";
import { CreateTagDTO, TagDTO, TagRepository } from "./TagRepository";

class TagRepositoryImp implements TagRepository {
  private model: Prisma.tagDelegate<tag>;

  constructor(database: Database) {
    // @ts-ignore
    this.model = database.instance.prisma.tag;
  }

  async create({ name, description }: CreateTagDTO): Promise<TagDTO>{
    const tag = await this.model.create({
      data: { name, description },
      select: { 
        id: true, 
        name: true, 
        description: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    return tag;
  };
}

export { TagRepositoryImp };