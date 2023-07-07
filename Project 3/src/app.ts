import {PrismaClient} from '@prisma/client'
import express from 'express'

export const prisma = new PrismaClient()
export const app = express()

app.use(express.json())


app.get("/", async (req, res) => {
    res.json({msg: "Welcome!!!"})
})


app.get(`/user`, async (_req, res) => {
    const result = await prisma.user.findMany()
    res.json(result)
})


app.get(`/user/:id`, async (req, res) => {
    const {id} = req.params

    const result = await prisma.user.findUnique({
        where: {id: Number(id)},
    })

    if(!result){
        res.status(404).json({
            error: 'Not found!',
        })
        return
    }

    res.json(result)
})


app.post(`/user`, async (req, res) => {
    const {name, email} = req.body

    try {
        const result = await prisma.user.create({
            data: {
                name,
                email,
            },
        })

        res.status(201).json(result)

    } catch (e) {
        res.status(409).json({
            error: 'User already exists!',
        })
    }
})