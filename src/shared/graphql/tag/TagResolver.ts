import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { TagRepository } from "../../../repositories/TagRepository";
import { TagRepositoryImp } from "../../../repositories/TagRepositoryImp";
import { CreateTagController } from "../../../useCases/createTag/CreateTagController";
import { createTagController } from "../../containers/TodoContainer";
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

  constructor() {
    this.tagRepository = new TagRepositoryImp();

    this.createTagController = createTagController(this.tagRepository);
  }

  @Mutation(() => TagObjectType)
  async createTag(@Arg("createTagInput") createTagInput: CreateTagInput) {
    const tag = await this.createTagController.handle(createTagInput);

    return tag;
  }
}

export { TagResolver };
