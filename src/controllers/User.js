import { db, objectId } from "../db/mongo.js";
import dayjs from "dayjs";

async function signIn_out(req, res) {
  const userID = res.locals.user.userID;
  const dataInput = res.locals.post;

  await db
    .collection("userSignInOut")
    .insertOne({ ...dataInput, userID, day: dayjs().format("DD/MM") });
  res.sendStatus(201);
}

async function getEntries(_, res) {
  const userID = res.locals.user.userID;
  const entries = await db
    .collection("userSignInOut")
    .find({ userID: userID })
    .toArray();
  const { name } = await db
    .collection("users")
    .findOne({ _id: new objectId(userID) });

  let total = 0;

  for (let i = 0; i < entries.length; i++) {
    if (entries[i].signIn_out) {
      total += parseFloat(entries[i].value);
    } else {
      total = total - entries[i].value;
    }
  }
  total = parseFloat(total).toFixed(2);
  res.send({ name, entries, total });
}

async function deleteSigns(req, res) {
  const entryID = req.params.entryID;
  await db
    .collection("userSignInOut")
    .deleteOne({ _id: new objectId(entryID) });
  res.sendStatus(202);
}

export { signIn_out, getEntries, deleteSigns };
