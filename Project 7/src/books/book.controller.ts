import {Request, Response} from 'express'
import * as booksService from './book.service'


export const createBook = async (request: Request, response: Response) => {
    const {categoryId, ...bookDTO} = request.body
    const newBook = await booksService.createBook({
        ...bookDTO,
        categories: {connect: Array.isArray(categoryId) ? categoryId : {id: categoryId}}
    })
    return response.json(newBook);
}


export const getBooks = async (request: Request, response: Response) => {
    const books = await booksService.getBooks()
    return response.json(books)
}


export const getOneBook = async (request: Request, response: Response) => {
    const {id} = request.params
    const book = await booksService.getOneBook(Number(id))
    return response.json(book)
}


export const updateBook = async (request: Request, response: Response) => {
    const {id} = request.params
    const {categoryId, ...bookDTO} = request.body
    const updatedBook = await booksService.updateBook(
        Number(id),
        {
            ...bookDTO,
            categories: {connect: Array.isArray(categoryId) ? categoryId : {id: categoryId}}
        }
    )
    return response.json(updatedBook)
}


export const deleteBook = async (request: Request, response: Response) => {
    const {id} = request.params
    const book = await booksService.deleteBook(Number(id))
    return response.json(book)
}


export const deleteBookCategory = async (request: Request, response: Response) => {
    const {bookId, categoryId} = request.params
    const updatedBook = await booksService.updateBook(
        Number(bookId),
        {
            categories: {disconnect: {id: Number(categoryId)}}
            // categories: {
            //     disconnect: {id: 3},
            //     connect: {id: 1},
            // }
        }
    )
    return response.json(updatedBook)
}