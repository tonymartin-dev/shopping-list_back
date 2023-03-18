import express from "express"
import { deleteController, createController, getByIdController, updateController, getAllController } from "../controllers/lists"

const listsRouter = express.Router()

listsRouter.get('/', getAllController)
listsRouter.get('/list/:id', getByIdController)
listsRouter.post('/', createController)
listsRouter.put('/', updateController)
listsRouter.delete('/', deleteController)

export default listsRouter