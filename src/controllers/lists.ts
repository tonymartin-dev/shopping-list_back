import { checkList, ListModel } from "../schemas/list"
import { Request, Response, NextFunction } from 'express';



export const getAllController = async (req: Request, res: Response, _next: NextFunction) => {
    const lists = await ListModel.find({})
    res.status(200).send(lists)
}


export const getByIdController = async (req: Request, res: Response, _next: NextFunction) => {
    const _id = req.params.id  
    const list = await ListModel.findOne({_id})
    res.status(200).send(list)
}

export const createController = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const newList = new ListModel(checkList(req.body))
        await newList.save()
        res.send(newList)
    } catch (e) {
        const error = e as (Error & { code: number })
        if (error.code === 11000 || error.code === 11001) {
            res.status(400).send({ error: 'You can\'t repeat list names.' })
            return
        }
        res.status(400).send({ error: error.toString() })
    }
}

export const updateController = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const newList = checkList(req.body)
        await ListModel.updateOne(
            { _id: newList.id },
            newList,
            { runValidators: true }
        )
        res.send(req.body)
    } catch (e) {
        res.status(400).send({ error: (e as Error).toString() })
    }
}

export const deleteController = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const _id = req.body.id
        if (typeof _id !== "string") {
            throw Error("Invalid value for 'id' property.")
        }

        await ListModel.deleteOne({ _id })
        res.send({ message: "List succesfully deleted" })
    } catch (e) {
        res.status(400).send({ error: (e as Error).toString() })
    }


}
