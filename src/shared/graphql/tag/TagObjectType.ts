import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
class TagObjectType {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;
}

@ObjectType()
class TagStatus {
  @Field()
  status: boolean;
}

export { TagObjectType, TagStatus };
