import { Router } from "express";
import { ClientController } from "../Http/Controllers/Client";

const router = Router();

const controller: ClientController = new ClientController();

router.get("/products", controller.getProducts);

export default router;
