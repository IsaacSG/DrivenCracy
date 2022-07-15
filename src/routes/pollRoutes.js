import { Router } from "express";
import { newPoll, allPolls } from "../controllers/pollControllers.js";


const router = Router();

router.post("/poll", newPoll);
router.get("/poll", allPolls);
router.get("/poll/:id/choice", allChoices);
router.get("/poll/:id/result", pollResult);

export default router;