import { User } from "../entity/User";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType({ isAbstract: true})
export class LoginResponse implements Partial<User> {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;
}

