import { Router } from "express";
import { newChoice, selectChoice } from "../controllers/choiceControllers";

const router = Router();

router.post("/choice", newChoice);
router.post("/choice")