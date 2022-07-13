import { Router } from "express";
import { newPoll, allPolls } from "../controllers/pollControllers.js";


const router = Router();

router.post("/poll", newPoll);
router.get("/poll", allPolls);

export default router;