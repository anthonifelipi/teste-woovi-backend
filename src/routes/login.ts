import Router from '@koa/router';
import loginController from '../controllers/login/login.controller';


const loginRouter = new Router();

loginRouter.post("/", loginController)

export default loginRouter