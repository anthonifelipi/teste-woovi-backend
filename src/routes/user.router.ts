import Router from "@koa/router";
import createUsersController from "../controllers/users/userCreate.controller";
import userListController from "../controllers/users/userList.controller";

const userRouter = new Router();

userRouter.post("/", createUsersController);
userRouter.get("/:id", userListController);

export default userRouter;
