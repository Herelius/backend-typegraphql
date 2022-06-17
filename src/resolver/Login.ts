import bcrypt from "bcryptjs";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import jwt from "jsonwebtoken";

import { User } from "../entity/User";
import { LoginInput } from "../types/LoginInput";

@Resolver()
export class LoginResolver {
  @Authorized()
  @Query(() => User)
  async getProjile(@Ctx() context: { token: string; user: User}): Promise<User | null> {
    const user = context.user
    return await User.findOne({ where: { id: user.id } });
  }

  @Mutation(() => String, { nullable: true })
  async login(
    @Arg("data") {
      email,
      password
    }: LoginInput): Promise<String | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return null;
    const token: string = jwt.sign({
      userId: user.id
    }, process.env.JWT_KEY as string);
    return token;
  };
}