import jwt from "jsonwebtoken";
import { User } from "./entity/User";

export const customAuthChecker = async ({ root, args, context, info }: any) => {
  const decoded = jwt.verify(context.token, process.env.JWT_KEY as string)
  try {
    if (typeof decoded !== "string") {
      if (!decoded.userId) {
        return false
      }
      const user = await User.findOne({ where: { id: decoded.userId } })
      if (!user) {
        return false
      }
      context.user = user;
      return true
    } else {
      return false
    }
  } catch(err) {
    return false
  }
};