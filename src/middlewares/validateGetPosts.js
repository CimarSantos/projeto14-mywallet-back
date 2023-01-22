import { db } from "../db/mongo.js";

export default async function validateGetPosts(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  const user = await db.collection("sessions").findOne({ token });

  if (!user) {
    res.status(404).send("Usuário Inválido!");
    return;
  }

  res.locals.user = user;

  next();
}
