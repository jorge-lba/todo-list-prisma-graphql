interface TagDTO {
  id: number;
  name: string;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CreateTagDTO {
  name: string;
  description: string;
}

interface TagRepository {
  create: ({ name, description }:CreateTagDTO) => Promise<TagDTO>;
  findAll: () => Promise<TagDTO[]>;
  findOneById: (tagId:number) => Promise<TagDTO>;
  findAllByIds: (tagIds:number[]) => Promise<TagDTO[]>;
}

export { TagDTO, TagRepository, CreateTagDTO };