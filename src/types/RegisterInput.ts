import { Field, InputType } from "type-graphql";
import { Length, IsEmail, MinLength } from "class-validator";
import { IsEmailAlreadyExist } from "./IsEmailAlreadyExist";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Email already exist" })
  email: string;

  @Field()
  @MinLength(1)
  password: string;
}