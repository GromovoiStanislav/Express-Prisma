const express = require('express')
require('express-async-errors');
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())


app.get("/", async (req, res) => {

    res.json({msg: "Welcome!!!"})
})


app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})


app.get('/user/:id/drafts', async (req, res) => {
    const {id} = req.params

    const drafts = await prisma.user
        .findUnique({
            where: {
                id: Number(id),
            },
        })
        .posts({
            where: {published: false},
        })

    res.json(drafts)
})


app.post(`/signup`, async (req, res) => {
    const {name, email, posts} = req.body

    const postData = posts
        ? posts.map((post) => {
            return {title: post.title, content: post.content || undefined}
        })
        : []

    const result = await prisma.user.create({
        data: {
            name,
            email,
            posts: {
                create: postData,
            },
        },
    })

    res.json(result)
})


app.post('/user/:id/profile', async (req, res) => {
    const {id} = req.params
    const {bio} = req.body

    const profile = await prisma.profile.create({
        data: {
            bio,
            user: {
                connect: {
                    id: Number(id)
                }
            }
        }
    })

    res.send(profile)
})


app.put('/user/:id/profile', async (req, res) => {
    const {id} = req.params
    const {bio} = req.body

    const userWithUpdatedProfile = await prisma.user.update({
        where: {id: Number(id)},
        data: {
            profile: {
                update: {
                    bio,
                },
            },
        },
        include:{
            profile: true
        }
    })

    res.send(userWithUpdatedProfile)
})





app.post(`/post`, async (req, res) => {
    const {title, content, authorEmail} = req.body

    const result = await prisma.post.create({
        data: {
            title,
            content,
            author: {connect: {email: authorEmail}},
        },
    })

    res.json(result)
})


app.put('/post/:id/views', async (req, res) => {
    const {id} = req.params

    try {

        const post = await prisma.post.update({
            where: {id: Number(id)},
            data: {
                viewCount: {
                    increment: 1,
                },
            },
        })

        res.json(post)

    } catch (error) {
        res.json({error: `Post with ID ${id} does not exist in the database`})
    }
})


app.put('/post/:id/publish', async (req, res) => {
    const {id} = req.params

    try {

        const postData = await prisma.post.findUnique({
            where: {id: Number(id)},
            select: {
                published: true,
            },
        })

        const updatedPost = await prisma.post.update({
            where: {id: Number(id)},
            data: {published: !postData.published},
        })

        res.json(updatedPost)

    } catch (error) {
        res.json({error: `Post with ID ${id} does not exist in the database`})
    }
})


app.delete(`/post/:id`, async (req, res) => {
    const {id} = req.params

    const post = await prisma.post.delete({
        where: {
            id: Number(id),
        },
    })

    res.json(post)
})


app.get(`/post/:id`, async (req, res) => {
    const {id} = req.params

    const post = await prisma.post.findUnique({
        where: {id: Number(id)},
    })

    res.json(post)
})


app.get('/feed', async (req, res) => {
    const {searchString, skip, take, orderBy} = req.query

    const or = searchString
        ? {
            OR: [
                {title: {contains: searchString}},
                {content: {contains: searchString}},
            ],
        }
        : {}

    const posts = await prisma.post.findMany({
        where: {
            published: true,
            ...or,
        },
        include: {author: true},
        take: Number(take) || undefined,
        skip: Number(skip) || undefined,
        orderBy: {
            updatedAt: orderBy || undefined,
        },
    })

    res.json(posts)
})


const server = app.listen(3000, () =>
    console.log(`Server ready at: http://localhost:3000`)
)