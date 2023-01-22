import express from "express";
import { List } from "../schemas/list";

const listsRouter = express.Router();

listsRouter.get('/', function(req, res, next) {
  List.find({})
  .exec((err, story) => {
    //if (err) return handleError(err);
    res.status(200)
    res.send(story);
  });
});


export default listsRouter