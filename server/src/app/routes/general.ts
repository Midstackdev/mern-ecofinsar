import { Router } from "express";
import { UserController } from "../Http/Controllers/UserController";
// import { HomeController } from "../Http/Controllers/Home";

const router = Router();

// const controller: HomeController = new HomeController();
const user: UserController = new UserController();

// router.get("/", controller.index);
router.get("/user/:id", user.get);

export default router;
