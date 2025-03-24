import express from "express";
import registerEmployeesController from "../controllers/registerEmployeesController.js";

const router = expressRouter();

router.route("/")
.post(resgiterEmployeesController.register);

export default router;