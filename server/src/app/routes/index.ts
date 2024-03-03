import homeRoute from "./home";
import userRoute from "./user";
import authRoute from "./auth";
import cleintRoute from "./cleint";
import generalRoute from "./general";
import managementRoute from "./management";
import salesRoute from "./sales";

import { Router } from "express";

const router = Router();

router.use("/", homeRoute);
router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/client", cleintRoute);
router.use("/general", generalRoute);
router.use("/management", managementRoute);
router.use("/sales", salesRoute);

export const routes = router;
