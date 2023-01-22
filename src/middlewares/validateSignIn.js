import bcrypt from "bcrypt";
import joi from "joi";
import { db, objectId } from "../db/mongo.js";
import { v4 as uuid } from "uuid";

const signinSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export default async function validateSignIn(req, res, next) {
  const data = req.body;
  const { error } = signinSchema.validate(data);

  if (error) {
    res.status(422).send("Todos os campos são de preenchimento obrigatório!");
    return;
  }

  const user = await db.collection("users").findOne({ email: data.email });

  if (!user || bcrypt.compareSync(data.password, user.password)) {
    res.status(404).send("Credenciais inválidas!");
    return;
  }

  const token = uuid();

  res.locals.user = {
    userID: objectId(user._id),
    token,
  };

  next();
}
