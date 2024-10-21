import { prisma } from "../../app";
import { AppError } from "../../errors/appErrors";
import Decimal from "decimal.js";
import { ITransaction } from "../../interfaces/users";

const createTransactionService = async (
  senderId: string,
  receiverCpf: string,
  amount: number
) => {
  if (amount < 0) {
    throw new AppError("Invalid amount, please  enter a positive number", 400);
  }

  const sender = await prisma.user.findUnique({
    where: {
      id: senderId,
    },
  });

  const receiver = await prisma.user.findUnique({
    where: {
      cpf: receiverCpf,
    },
  });

  console.log(receiver);

  if (!sender || !receiver) {
    throw new AppError("Receiver not found");
  }

  if (sender.cpf == receiverCpf) {
    throw new AppError("You can't send money to yourself", 400);
  }

  const senderBalance = new Decimal(sender.balance);
  const receiverBalance = new Decimal(receiver.balance);

  await prisma.user.update({
    where: {
      id: senderId,
    },
    data: {
      balance: senderBalance.minus(amount).toString(),
    },
  });

  await prisma.user.update({
    where: {
      cpf: receiverCpf,
    },
    data: {
      balance: receiverBalance.plus(amount).toString(),
    },
  });

  const transaction = await prisma.transaction.create({
    data: {
      senderId: senderId,
      receiverId: receiver.id,
      amount: amount.toString(),
    },
  });

  return transaction;
};
export default createTransactionService;
