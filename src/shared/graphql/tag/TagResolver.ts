import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';

import { TagDTO, TagRepository } from '../../../repositories/TagRepository';
import { TagRepositoryImp } from '../../../repositories/TagRepositoryImp';
import { CreateTagController } from '../../../useCases/createTag/CreateTagController';
import { ListTagController } from '../../../useCases/listTag/ListTagController';
import { UpdateTagController } from '../../../useCases/updateTag/UpdateTagController';
import {
  createTagController,
  listTagController,
  updateTagController,
} from '../../containers/TodoContainer';
import { Database } from '../../database/prisma';
import { TagObjectType } from './TagObjectType';

@InputType()
class CreateTagInput {
  @Field()
  name: string;

  @Field()
  description: string;
}

@InputType()
class UpdateTagInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}

@Resolver(TagObjectType)
class TagResolver {
  tagRepository: TagRepository;

  createTagController: CreateTagController;
  listTagController: ListTagController;
  updateTagController: UpdateTagController;

  constructor() {
    this.tagRepository = new TagRepositoryImp(Database.instance);

    this.createTagController = createTagController(this.tagRepository);
    this.listTagController = listTagController(this.tagRepository);
    this.updateTagController = updateTagController(this.tagRepository);
  }

  @Mutation(() => TagObjectType)
  async createTag(
    @Arg('createTagInput') createTagInput: CreateTagInput,
  ): Promise<TagDTO> {
    const tag = await this.createTagController.handle(createTagInput);

    return tag;
  }

  @Query(() => [TagObjectType])
  async tags(): Promise<TagDTO[]> {
    const tags = await this.listTagController.handle();

    return tags;
  }

  @Mutation(() => TagObjectType)
  async updateTag(
    @Arg('tagId') tagId: number,
    @Arg('updateTagInput') updateTagInput: UpdateTagInput,
  ): Promise<TagDTO | undefined> {
    const tag = await this.updateTagController.handle({
      id: tagId,
      ...updateTagInput,
    });

    return tag;
  }
}

export { TagResolver };
