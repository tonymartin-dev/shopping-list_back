import { checkList, ListModel } from "../schemas/list"
import { Request, Response, NextFunction } from 'express';

export const getAllController = async (req: Request, res: Response, _next: NextFunction) => {
    const userCreator = req.body.tokenUser?.id
    const lists = await ListModel.find({userCreator})
    res.status(200).send(lists)
}


export const getByIdController = async (req: Request, res: Response, _next: NextFunction) => {
    const userCreator = req.body.tokenUser?.id
    if(!userCreator) {
        res.status(401).send({error: "error obtaining logged user"})
    }
    const _id = req.params.id  
    const list = await ListModel.findOne({_id, userCreator})
    if(!list) {
        return res.status(400).send({error: "List not found"})
    }
    res.status(200).send(list)
}

export const createController = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const {tokenUser, ...listData} = req.body        
        const userCreator = tokenUser.id

        const newList = new ListModel(checkList({...listData, userCreator}))
        await newList.save()
        res.send(newList)
    } catch (e) {
        const error = e as (Error & { code: number })
        if (error.code === 11000 || error.code === 11001) {
            return res.status(400).send({ error: 'You can\'t repeat list names.' })
        }
        res.status(400).send({ error: error.toString() })
    }
}

export const updateController = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const {tokenUser, ...listData} = req.body        
        const userCreator = tokenUser.id

        const query = { _id: listData.id, userCreator }
        const newList = {...listData, userCreator}
        
        const result = await ListModel.updateOne(
            query,
            newList,
            { runValidators: true }
        )

        console.log({result})

        res.send(newList)
    } catch (e) {
        res.status(400).send({ error: (e as Error).toString() })
    }
}

export const deleteController = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const _id = req.body.id
        const userCreator = req.body.tokenUser?.id
        if (typeof _id !== "string") {
            throw Error("Invalid value for 'id' property.")
        }

        const result = await ListModel.deleteOne({ _id, userCreator })
        
        if(result.deletedCount === 0) {
            return res.status(400).send({error: "List not found"})
        }

        res.send({ message: "List succesfully deleted" })
    } catch (e) {
        res.status(400).send({ error: (e as Error).toString() })
    }


}
