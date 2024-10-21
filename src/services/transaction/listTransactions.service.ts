import { prisma } from "../../app";
import { IUserResponse } from "../../interfaces/users";

const listTransactionService = async (userId: string) => {
  const transactionsSend = await prisma.transaction.findMany({
    where: {
      senderId: userId,
    },
  });

  const transactionsReceived = await prisma.transaction.findMany({
    where: {
      receiverId: userId,
    },
  });

  const transactions = {
    transactionsSends: transactionsSend,
    transactionsReceiveds: transactionsReceived,
  };

  return transactions
};
export default listTransactionService;
