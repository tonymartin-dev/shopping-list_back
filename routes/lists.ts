import express from "express"
import { checkList, ListModel } from "../schemas/list"

const listsRouter = express.Router()

listsRouter.get('/', function(req, res, next) {
  ListModel.find({})
  .exec((err, story) => {
    //if (err) return handleError(err)
    res.status(200)
    res.send(story)
  })
})

listsRouter.post('/', async (req, res, next) => {
  try{
    const newList = new ListModel(checkList(req.body))
    await newList.save()
    res.send(newList)
  } catch (e) {
    const error = e as (Error & {code: number})
    res.status(400)
    if (error.code === 11000 || error.code === 11001) {
      res.status(409).send({error: 'You can\'t repeat list names.'})
    }
    res.send({error: error.toString()})
  }
})

listsRouter.put('/', async (req, res, next) => {
  try {
    const newList = checkList(req.body)
    const savedList = await ListModel.updateOne(
      { _id: newList.id },
      newList,
      {
        runValidators: true
      }
    )
    res.send(savedList)
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