import express from "express"
import { deleteController, getAllController, getByIdController, updateController } from "../controllers/lists"

const listsRouter = express.Router()

listsRouter.get('/', )
listsRouter.get('/list/:id', getByIdController)
listsRouter.post('/', getAllController)
listsRouter.put('/', updateController)
listsRouter.delete('/', deleteController)

export default listsRouter