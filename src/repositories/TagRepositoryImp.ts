import { Prisma, Tag } from '.prisma/client';

import { Database } from '../shared/database/prisma';
import { CreateTagDTO, TagDTO, TagRepository } from './TagRepository';

class TagRepositoryImp implements TagRepository {
  private model: Prisma.TagDelegate<Tag>;

  constructor(database: Database) {
    this.model = database.prisma.tag;
  }

  async create({ name, description }: CreateTagDTO): Promise<TagDTO> {
    const tag = await this.model.create({
      data: { name, description },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return tag;
  }

  async findAll(): Promise<TagDTO[]> {
    const tags = await this.model.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return tags;
  }

  async updatedById(
    tagId: number,
    { name, description }: Partial<CreateTagDTO>,
  ): Promise<TagDTO> {
    const tag = await this.model.update({
      where: { id: tagId },
      data: { name, description },
    });

    return tag;
  }

  findOneById: (tagId: number) => Promise<TagDTO>;
  findAllByIds: (tagIds: number[]) => Promise<TagDTO[]>;
}

export { TagRepositoryImp };
