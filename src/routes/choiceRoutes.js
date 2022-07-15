import { Router } from "express";
import { newChoice, selectChoice } from "../controllers/choiceControllers.js";

const router = Router();

router.post("/choice", newChoice);
router.post("/choice/:id/vote", selectChoice);

export default router;