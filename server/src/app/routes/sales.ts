import { Router } from "express";
import { SaleController } from "../Http/Controllers/Sale";

const router = Router();

const controller: SaleController = new SaleController();

router.get("/", controller.index);

export default router;
