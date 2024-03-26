import { Router } from "express";
import { ManagementController } from "../Http/Controllers/Management";

const router = Router();

const controller: ManagementController = new ManagementController();

router.get("/", controller.index);

export default router;
