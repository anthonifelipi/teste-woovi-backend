import Router from "@koa/router";
import createTransactionController from "../controllers/transaction/createTransaction.controller";
import verifyAuthToken from "../middlewares/verifyAuthToken";
import listTransactionsController from "../controllers/transaction/listTransaction.controller";

const transactionRouter = new Router();

transactionRouter.post("/", verifyAuthToken, createTransactionController);
transactionRouter.get("/", verifyAuthToken, listTransactionsController)

export default transactionRouter;
