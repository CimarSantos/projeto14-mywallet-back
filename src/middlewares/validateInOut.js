import joi from "joi";
import { db } from "../db/mongo.js";

const in_outSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required(),
  in_out: joi.boolean().required(),
});

export default async function validateInOut(req, res, next) {
  const { error } = in_outSchema.validate(req.body);

  if (error) {
    res.status(400).send("Credenciais inválidas!");
    return;
  }

  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  const user = await db.collection("sessions").findOne({ token });

  if (!user) {
    res.status(404).send("Autorização inválida!");
    return;
  }

  req.body.value = parseFloat(req.body.value).toFixed(2);

  res.locals.user = user;
  res.locals.post = req.body;

  next();
}
