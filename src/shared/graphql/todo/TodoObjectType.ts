import { Field, ObjectType, ID } from "type-graphql";

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
}

export { TodoObjectType };