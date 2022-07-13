import { pollSchema } from "../schemas/pollSchema.js";
import db from "../database/mongodb.js";
import dayjs from "dayjs";

export async function newPoll(req, res) {
    const title = req.body.title;
    const expiredAt = "";
    if(req.body.expiredAt !== ""){
        expiredAt = req.body.expiredAt;
    }
    else {
        expiredAt = dayjs().add(30, day);
    }
}

    const validate = pollSchema.validate({title});

    if (validate.error){
        return res.sendStatus(422);
    }

    try {
        await db
        .collection("poll")
        .insertOne({
            title,
            expiredAt
        });
        res.sendStatus(201);
    }
    catch(error) {
        console.error("Deu ruim na hora de criar uma nova poll");
        res.sendStatus(422);
    }

export async function allPolls(req, res) {

}