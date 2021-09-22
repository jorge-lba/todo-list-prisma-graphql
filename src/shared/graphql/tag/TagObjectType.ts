import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class TagObjectType {
  @Field(() => ID!)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;
}

export { TagObjectType };