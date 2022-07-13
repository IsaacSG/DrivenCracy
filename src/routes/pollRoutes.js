import { Router } from "express";


const router = Router();

router.post("/poll", newPoll);
router.get("/poll", allPolls);