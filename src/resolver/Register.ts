import bcrypt from "bcryptjs";
import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../entity/User";
import { RegisterInput } from "../types/RegisterInput";

@Resolver()
export class RegisterResolver {
  @Mutation(() => String)
  async register(@Arg("data") {
    firstName,
    lastName,
    email,
    password
  }: RegisterInput): Promise<String> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();
    return "User created successfully";
  }
}