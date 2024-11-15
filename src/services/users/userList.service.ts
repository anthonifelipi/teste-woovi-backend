import { prisma } from "../../app";
import { AppError } from "../../errors/appErrors";

const userListService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user) {
    throw new AppError("Usuario não encontrado", 400);
  }

  const { password, ...response } = user;
  return response;
};
export default userListService;
