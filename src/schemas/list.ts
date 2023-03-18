import mongoose from "mongoose";

export interface List {
  name: string,
  items: string[]
  completed?: boolean
}

export interface SavedList extends List {
  id: string
}

const Schema = mongoose.Schema;

const listSchema = new Schema<List>({
  name: { type: String, required: true },
  items: { type: [String], required: true },
  completed: { type: Boolean, required: false }
});

export const ListModel = mongoose.model("List", listSchema);

export const checkList = (list: unknown, isSaved?: boolean): SavedList => {
  const checkedList = list as SavedList;

  if(!checkedList?.name || typeof checkedList.name !== "string") {
    throw new Error("Field 'name' is not properly formatted")
  }

  if(
    !checkedList?.items || 
    !Array.isArray(checkedList.items) || 
    checkedList.items.some(item => typeof item !== "string")
  ){
    throw new Error("Field 'items' is not properly formatted")
  }

  if(isSaved && !checkedList.id){
    throw new Error("Field 'id' is required")
  }

  return checkedList
}