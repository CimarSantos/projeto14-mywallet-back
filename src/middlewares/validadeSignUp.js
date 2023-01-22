import bcrypt from "bcrypt";
import joi from "joi";
import { db } from "../db/mongo.js";

const signupSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().required(),
  password: joi.string().required(),
  repeat_password: joi.string().required(),
});

export default async function validateSignUp(req, res, next) {
  const newSignup = req.body;
  const { error } = signupSchema.validate(newSignup);

  if (error) {
    res.status(422).send(error);
    return;
  }
  if (newSignup.password !== newSignup.repeat_password) {
    res.status(400).send("As senhas digitadas não coincidem!");
    return;
  }

  const ifEmailExists = await db
    .collection("users")
    .findOne({ email: newSignup.email });

  if (ifEmailExists) {
    res.status(409).send("Este e-mail já está sendo usado, tente outro!");
    return;
  }

  delete newSignup.repeat_password;
  newSignup.password = bcrypt.hashSync(newSignup.password, 10);
  res.locals.newSignup = newSignup;

  next();
}
