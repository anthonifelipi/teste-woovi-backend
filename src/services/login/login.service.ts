import { AppError } from "../../errors/appErrors";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../app";

const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError("Wrong credentials", 403);
  }

  const matchPassword = await compare(password, user.password);
  if (!matchPassword) {
    throw new AppError("Wrong credentials", 403);
  }

  const token = jwt.sign(
    {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
      },
    },
    String(process.env.JWT_SECRET),
    { expiresIn: "12h" }
  );

  const userReturn = {
    id: user.id,
    name: user.name,
    email: user.email,
    cpf: user.cpf,
  };

  return { token, userReturn };
};
export default loginService;
