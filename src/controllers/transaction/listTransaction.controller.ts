import { Context } from "koa";

import { IUserResponse } from "../../interfaces/users";
import listTransactionService from "../../services/transaction/listTransactions.service";

const listTransactionsController = async (ctx: Context) => {
  try {
    const userId: string | undefined = ctx.state.user.id;

    if (!userId) {
      ctx.status = 401;
      ctx.body = { error: "Unauthorized" };
      return;
    }

    const listTasks = await listTransactionService(userId);
    ctx.status = 200;
    ctx.body = listTasks;
  } catch (error) {
    if (error instanceof Error) {
      ctx.status = 400;
      ctx.body = {
        message: error.message,
      };
    }
  }
};

export default listTransactionsController;
