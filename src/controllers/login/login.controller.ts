import { Context } from "koa";
import createUserService from "../../services/users/userCreate.service";
import loginService from "../../services/login/login.service";
import { ILogin } from "../../interfaces/users";

const loginController = async (ctx: Context) => {
  try {
    const { email, password } = ctx.request.body as ILogin;

    const newUser = await loginService(email, password);
    ctx.status = 201;
    ctx.body = newUser;
  } catch (error) {
    if (error instanceof Error) {
      ctx.status = 400;
      ctx.body = {
        message: error.message,
      };
    }
  }
};

export default loginController;
