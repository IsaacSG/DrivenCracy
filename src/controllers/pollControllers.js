import { pollSchema } from "../schemas/pollSchema.js";
import db from "../database/mongodb.js";
import dayjs from "dayjs";


export async function allPolls(req, res) {
    try {
        let polls = await db
        .collection('poll')
        .find()
        .toArray();

        res.status(200).send(polls);
    }
    catch(error) {
        console.error(error);
    }
};

export async function newPoll(req, res) {
    const title = req.body.title;
    let expiredday = req.body.expiredAt;
    const day = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm')
    let expiredAt = "";
    if(expiredday==undefined){
        expiredAt = day
    }
    else {
        expiredAt = expiredday;
    }


    const validate = pollSchema.validate({title});

    if (validate.error) {
        return res.sendStatus(422).send("Title é obrigatorio");
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
};