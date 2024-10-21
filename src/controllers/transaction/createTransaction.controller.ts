import { Context } from "koa";
import createUserService from "../../services/users/userCreate.service";
import { ITransaction } from "../../interfaces/users";
import createTransactionService from "../../services/transaction/createTransaction.service";

const createTransactionController = async (ctx: Context) => {
  try {
    const { receiver, amount } = ctx.request.body as ITransaction;
    const userId = ctx.state.user.id;
    const transaction = await createTransactionService(
      userId,
      receiver,
      amount
    );
    ctx.status = 201;
    ctx.body = {
      message: "Transaction sucess",
      transaction,
    };
  } catch (error) {
    if (error instanceof Error) {
      ctx.status = 400;
      ctx.body = {
        message: error.message,
      };
    }
  }
};

export default createTransactionController;
