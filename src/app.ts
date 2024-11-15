import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { ApolloServer } from "apollo-server-koa";
import mongoose from "mongoose";
import userRouter from "./routes/user.router";
import Router from "@koa/router";
import handlerErrors from "./middlewares/handlerError";
import { PrismaClient } from "@prisma/client";
import loginRouter from "./routes/login";
import transactionRouter from "./routes/transaction";
import cors from "@koa/cors";

export const app = new Koa();
const router = new Router();
export const prisma = new PrismaClient();

router.use("/users", userRouter.routes(), userRouter.allowedMethods());
router.use("/login", loginRouter.routes(), loginRouter.allowedMethods());
router.use(
  "/transaction",
  transactionRouter.routes(),
  transactionRouter.allowedMethods()
);

// Conecte-se ao MongoDB
// mongoose.connect('mongodb://localhost:27017/nome-do-banco', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('Conectado ao MongoDB'))
//   .catch((err) => console.log('Erro ao conectar ao MongoDB', err));

// Defina os tipos e resolvers GraphQL
const typeDefs = `
  type Query {
    hello: String
  }
`;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const resolvers = {
  Query: {
    hello: () => "Olá, mundo!",
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app });
});

app.use(bodyParser());
app.use(handlerErrors);
app.use(router.routes()).use(router.allowedMethods());
