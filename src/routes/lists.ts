import express from "express"
import { checkList, ListModel } from "../schemas/list"

const listsRouter = express.Router()

listsRouter.get('/', async (req, res, next) => {  
  const lists = await ListModel.find({})  
  res.status(200).send(lists)
})

listsRouter.get('/list/:id', async (req, res, next) => {
  const _id = req.params.id  
  const list = await ListModel.findOne({_id})
  res.status(200).send(list)
})

listsRouter.post('/', async (req, res, next) => {
  try{
    const newList = new ListModel(checkList(req.body))
    await newList.save()
    res.send(newList)
  } catch (e) {
    const error = e as (Error & {code: number})
    if (error.code === 11000 || error.code === 11001) {
      res.status(400).send({error: 'You can\'t repeat list names.'})
      return
    }
    res.status(400).send({error: error.toString()})
  }
})

listsRouter.put('/', async (req, res, next) => {
  try {
    const newList = checkList(req.body)
    await ListModel.updateOne(
      { _id: newList.id },
      newList,
      { runValidators: true }
    )
    res.send(req.body)
  } catch(e) {
    res.send({error: (e as Error).toString()})
  }
})

listsRouter.delete('/', async (req, res, next) => {
  try {
    const _id = req.body.id
    await ListModel.deleteOne({ _id })
    res.send({message: "List succesfully deleted"})
  } catch(e) {
    res.send({error: (e as Error).toString()})
  }


})


export default listsRouter