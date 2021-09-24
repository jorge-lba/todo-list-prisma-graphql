import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { TagRepository } from "../../../repositories/TagRepository";
import { TagRepositoryImp } from "../../../repositories/TagRepositoryImp";
import { CreateTagController } from "../../../useCases/createTag/CreateTagController";
import { ListTagController } from "../../../useCases/listTag/ListTagController";
import { createTagController, listTagController } from "../../containers/TodoContainer";
import { Database } from "../../database/prisma";
import { TagObjectType } from "./TagObjectType";

@InputType()
class CreateTagInput {
  @Field()
  name: string;

  @Field()
  description: string;
}

@Resolver(TagObjectType)
class TagResolver {
  tagRepository: TagRepository;

  createTagController: CreateTagController
  listTagController: ListTagController

  constructor() {
    //@ts-ignore
    this.tagRepository = new TagRepositoryImp(Database);

    this.createTagController = createTagController(this.tagRepository);
    this.listTagController = listTagController(this.tagRepository);
  }

  @Mutation(() => TagObjectType)
  async createTag(@Arg("createTagInput") createTagInput: CreateTagInput) {
    const tag = await this.createTagController.handle(createTagInput);

    return tag;
  }

  @Query(() => [TagObjectType])
  async tags() {
    const tags = await this.listTagController.handle();

    return tags;
  }
}

export { TagResolver };
