import { Router } from "express";
import { ClientController } from "../Http/Controllers/Client";

const router = Router();

const controller: ClientController = new ClientController();

router.get("/products", controller.getProducts);
router.get("/customers", controller.getCustomers);
router.get("/transactions", controller.getTransactions);
router.get("/geography", controller.getGeography);

export default router;
