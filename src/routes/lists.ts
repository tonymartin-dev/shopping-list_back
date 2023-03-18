import express from "express"
import { deleteController, createController, getByIdController, updateController, getAllController } from "../controllers/lists"
import { authMiddleware } from "../shared/auth"

const listsRouter = express.Router()

listsRouter.get('/', authMiddleware, getAllController)
listsRouter.get('/list/:id', authMiddleware, getByIdController)
listsRouter.post('/', authMiddleware, createController)
listsRouter.put('/', authMiddleware, updateController)
listsRouter.delete('/', authMiddleware, deleteController)

export default listsRouter