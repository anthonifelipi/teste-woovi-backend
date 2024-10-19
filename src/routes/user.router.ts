import Router from '@koa/router';
import createUsersController from '../controllers/users/userCreate.controller';

const userRouter = new Router();

userRouter.post("/", createUsersController)

export default userRouter