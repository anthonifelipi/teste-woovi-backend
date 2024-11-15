import { prisma } from "../../app";
import { AppError } from "../../errors/appErrors";
import Decimal from "decimal.js";

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
  console.log(senderId, receiverCpf, amount, "AUQIIIII");
  const receiver = await prisma.user.findUnique({
    where: {
      cpf: receiverCpf,
    },
  });
  if (!sender || !receiver) {
    throw new AppError("Receiver not found");
  }
  console.log(sender, "sender");
  if (sender.cpf == receiverCpf) {
    throw new AppError("You can't send money to yourself", 400);
  }

  console.log(receiver, "AQUI cheguei");
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
      name: receiver.name,
      senderId: senderId,
      receiverId: receiver.id,
      amount: amount.toString(),
    },
  });
  console.log("Deu certo");
  return transaction;
};
export default createTransactionService;
