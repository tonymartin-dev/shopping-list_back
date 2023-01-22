import mongoose from "mongoose";

const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: String,
  items: Array<String>
});

export const List = mongoose.model("List", listSchema);
