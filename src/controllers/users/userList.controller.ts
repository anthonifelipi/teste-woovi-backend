import { Context } from "koa";
import userListService from "../../services/users/userList.service";

const userListController = async (ctx: Context) => {
  try {
    const userId: string | undefined = ctx.params.id;

    if (!userId) {
      ctx.status = 401;
      ctx.body = { error: "Unauthorized" };
      return;
    }

    const user = await userListService(userId);
    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    if (error instanceof Error) {
      ctx.status = 400;
      ctx.body = {
        message: error.message,
      };
    }
  }
};

export default userListController;
