import { Field, ID } from "type-graphql";

class TagObjectType {
  @Field(() => ID!)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;
}

export { TagObjectType };