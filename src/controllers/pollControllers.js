import { pollSchema } from "../schemas/pollSchema.js";
import db from "../database/mongodb.js";
import dayjs from "dayjs";
import reckon from "../middleware/reckon.js"


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

export async function allChoices(req, res) {
    const { id } = req.params;

    try {
      const choicesPoll = await db
        .collection("choice")
        .find({ poolId: id })
        .toArray();
  
      res.status(200).send(choicesPoll);
    } 
    catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

export async function pollResult(req, res) {

    const { id } = req.params;

    try {
      const poll = await db.collection("poll").findOne(ObjectId(id));
  
      if (!poll) return res.sendStatus(404);
  
      await db.collection("poll").updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            result: {
              title: poll.title,
              votes: reck,
            },
          },
        }
      );
  
      res.sendStatus(201);
    } 
    catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

