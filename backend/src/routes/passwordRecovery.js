import express, { Router } from "express";
import passwordRecoveryController from "../controllers/passwordRecoveryController";
const router = express.Router();

router.route("/requestCode").post(passwordRecoveryController.requestCode);
router.route("/veridyCode").post(passwordRecoveryController.verifyCode);


export default router;