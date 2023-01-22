import { db, objectId } from "../db/mongo.js";

async function signUp(req, res) {
  await db.collection("users").insertOne(res.locals.newSignUp);
  res.sendStatus(201);
}

async function signIn(req, res) {
  const user = res.locals.user;
  const token = {
    token: user.token,
  };

  const atualSignIn = await db
    .collection("sessions")
    .findOne({ userID: user.userID });
  if (atualSignIn) {
    await db
      .collection("sessions")
      .updateOne({ userID: user.userID }, { $set: token });
    res.status(200).send(user.token);
    return;
  }
  await db.collection("sessions").insertOne(user);
  res.status(200).send(user.token);
}

export { signUp, signIn };
