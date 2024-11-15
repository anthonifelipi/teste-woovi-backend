import { Context } from "koa";
import createUserService from "../../services/users/userCreate.service";
import { IUserRequest } from "../../interfaces/users";

const createUsersController = async (ctx: Context) => {
  try {
    const data: any = ctx.request.body;
    console.log(data, "front aqui");

    const newUser = await createUserService(data);
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

export default createUsersController;
