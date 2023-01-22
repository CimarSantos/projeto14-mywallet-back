import joi from "joi";
import { db, objectId } from "../db/mongo.js";

const postSchema = joi.object({
  post: joi.string().min(10).required(),
});

export default async function validateDelete(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const post = { post: req.params.postID };

  const { error } = postSchema.validate(req.body);
  let validPost;

  if (error) {
    res.status(400).send(error);
    return;
  }

  const user = await db.collection("sessions").findOne({ token });

  try {
    validPost = await db
      .collection("usersInOut")
      .findOne({ _id: new objectId(post.post) });
  } catch (error) {
    res.status(400).send("Este post é inválido!");
    return;
  }

  if (!user) {
    res.status(404).send("Autorização inválida!");
    return;
  }
  if (!validPost) {
    res.status(404).send("Este post é inválido!");
    return;
  }
  if (JSON.stringify(user.userID) != JSON.stringify(validPost.userID)) {
    res.status(400).send("Este usuário é inválido!");
    return;
  }

  res.locals.postID = post.post;

  next();
}
