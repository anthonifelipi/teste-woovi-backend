import jwt from "jsonwebtoken";
import { Context, Next } from "koa";
import "dotenv/config";

const verifyAuthToken = async (ctx: Context, next: Next) => {
  const authorizationHeader = ctx.headers.authorization;

  if (!authorizationHeader) {
    ctx.status = 401;
    ctx.body = { message: "Invalid token" };
    return;
  }
  const token = authorizationHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as any;
    ctx.state.user = {
      id: decoded.user.id,
    };
    await next();
  } catch (error) {
    console.error("Token verification error:", error);
    ctx.status = 401;
    ctx.body = { message: "Invalid token" };
  }
};

export default verifyAuthToken;
