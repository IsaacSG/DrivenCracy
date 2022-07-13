import { pollSchema } from "../schemas/pollSchema.js";
import db from "../database/mongodb.js";
import dayjs from "dayjs";

export async function newPoll(req, res) {
    const { title, expiredAt } = req.body;



    const validate = pollSchema.validate({title});

    if (validate.error) {
        res.sendStatus(422).send("Title é obrigatorio");
    }

    try {
        await db
        .collection("poll")
        .insertOne({
            title

        });
        res.sendStatus(201);
    }
    catch(error) {
        console.error("Deu ruim na hora de criar uma nova poll");
        res.sendStatus(422);
    }
}

export async function allPolls(req, res) {
    try {
        const polls = await db
        .collection("poll")
        .find()
        .toArray();

        res.sendStatus(200);
    }
    catch(error) {
        console.error("Não foi possivel pegar as polls");
    }
}