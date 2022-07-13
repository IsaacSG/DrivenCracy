import { required } from "joi";

const pollSchema = joi.object ({
    title: joi.string().required()
});