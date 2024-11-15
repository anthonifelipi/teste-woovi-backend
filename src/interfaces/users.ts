import { Decimal } from "@prisma/client/runtime/library";

export interface IUserRequest {
  name: string;
  email: string;
  cpf: string;
  password: string;
}
export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  cpf: string;
  balance: Decimal;
  createdAt: Date;
  updatedAt: Date;
}
export interface ILogin {
  email: string;
  password: string;
}

export interface ITransaction {
  senderId: string;
  receiver: string;
  amount: number;
}
