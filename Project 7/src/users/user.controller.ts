import {Request, Response} from 'express'
import * as usersService from './user.service'


export const createUser = async (request: Request, response: Response) => {
    const {address, ...userDTO} = request.body
    const newUser = await usersService.createUser({
        ...userDTO,
        address: {create: address}
    })
    return response.json(newUser)
}


export const getUsers = async (request: Request, response: Response) => {
    const users = await usersService.getUsers()
    return response.json(users)
}


export const getOneUser = async (request: Request, response: Response) => {
    const {id} = request.params
    const user = await usersService.getOneUser(Number(id))
    return response.json(user)
}


export const updateUser = async (request: Request, response: Response) => {
    const {id} = request.params
    const {authorId, editorId, address, ...userDTO} = request.body
    const updatedAuthor = await usersService.updateUser(
        Number(id),
        {
            ...userDTO,
            address: {
                upsert: {
                    create: address,
                    update: address,
                },
                //update: address
            }
        }
    )
    return response.json(updatedAuthor)
}


export const updateAuthor = async (request: Request, response: Response) => {
    const {id} = request.params
    const {editorId} = request.body

    await usersService.deleteEditorId(editorId)

    const updatedAuthor = await usersService.updateUser(
        Number(id),
        {
            editor: {connect: {id: editorId}}
            // editorId
        }
    )

    return response.json(updatedAuthor)
}


export const deleteAuthor = async (request: Request, response: Response) => {
    const {id} = request.params

    const updatedAuthor = await usersService.updateUser(
        Number(id),
        {
            editor: {disconnect: true}
            // editorId: null
        }
    )
    return response.json(updatedAuthor)
}


export const updatePublisher = async (request: Request, response: Response) => {
    const {id} = request.params
    const {authorId} = request.body

    const updatedAuthor = await usersService.updateUser(
        Number(id),
        {
            authors: {connect: {id: authorId}}
        }
    )
    return response.json(updatedAuthor)
}


export const deletePublisher = async (request: Request, response: Response) => {
    const {id} = request.params
    const {authorId} = request.body

    const updatedAuthor = await usersService.updateUser(
        Number(id),
        {
            authors: {disconnect: {id: authorId}}
        })
    return response.json(updatedAuthor)
}


export const deleteUser = async (request: Request, response: Response) => {
    const {id} = request.params
    const user = await usersService.deleteUser(Number(id))
    return response.json(user)
}


export const createAddress = async (request: Request, response: Response) => {
    const address = await usersService.createAddress(request.body)
    return response.json(address)
}


export const getAddress = async (request: Request, response: Response) => {
    const address = await usersService.getAddress()
    return response.json(address)
}