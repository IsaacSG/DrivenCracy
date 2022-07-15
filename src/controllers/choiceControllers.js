import db from "../database/mongodb.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { choiceSchema } from "../schemas/choiceSchema.js";

export async function newChoice(req, res) {
    const { title, poolId} = req.body;

    const validate = choiceSchema.validate({title, poolId});

    const poll = await db.collection("poll").findOne(ObjectId(poolId));

    if(!poll) {
        return res.sendStatus(404);
    }
    if(validate.error) {
        return res.sendStatus(422);
    }
    const inicialDate = Date.parse(poll.expireAt);
    const day = Date.parse(dayjs().format("YYYY-MM-DD HH:mm"));
    const timeDiff = inicialDate - day;

    if (timeDiff <= 0) return res.sendStatus(403);

    const newchoice = await db.collection("choice").findOne({ title: title });
    if(newchoice !== null) {
        if (newchoice.title === title) {
            return res.sendStatus(409);
        }
    }

    try {
        await db
        .collection("choice")
        .insertOne({
            title,
            poolId
        });
        res.sendStatus(201);
    }
    catch(error) {
        console.error("Deu ruim na hora de criar uma choice");
        res.sendStatus(422);
    }
}

export async function selectChoice(req, res) {
    const { id } = req.params;

  try {
    const selectchoice = await db.collection("choice").findOne(ObjectId(id));

    if (!selectchoice) {
        res.sendStatus(404);
    }
    const poll = await db.collection("poll").findOne(ObjectId(poolId));

    if (!poll) {
        return res.sendStatus(404);
    }

    const inicialDate = Date.parse(poll.expireAt);
    const day = Date.parse(creationDate);
    const timeDiff = inicialDate - day;

    if (timeDiff <= 0) return res.sendStatus(403);
    await db.collection("vote").insertOne({
      createdAt: day,
      choiceId: ObjectId(id),
    });

    res.sendStatus(201);
  } 
  catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}