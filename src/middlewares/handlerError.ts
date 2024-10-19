import { AppError } from "../errors/appErrors";
import { Context, Next } from "koa";

const handlerErrors = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof AppError) {
      ctx.status = error.statusCode;
      ctx.body = {
        message: error.message,
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        message: "Internal server error",
      };
    }
  }
};

export default handlerErrors;
