import { Field, ObjectType, ID } from "type-graphql";
import { TagObjectType } from "../tag/TagObjectType";

@ObjectType()
class TodoObjectType {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  done: boolean;

  @Field(() => [TagObjectType])
  tags?: Array<TagObjectType>;
}

@ObjectType()
class TodoStatus {
  @Field()
  status: boolean;
}

export { TodoObjectType, TodoStatus };