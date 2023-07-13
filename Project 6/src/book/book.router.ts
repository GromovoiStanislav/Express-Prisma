import express from "express";
import type {Request, Response} from "express";
import {body, validationResult} from "express-validator";

import * as BookService from "./book.service";
import * as AuthorService from "../author/author.service";

export const bookRouter = express.Router();


// GET: List all the books
bookRouter.get("/", async (request: Request, response: Response) => {
    try {
        const books = await BookService.listBooks();
        return response.status(200).json(books);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});


// GET: List of the books by author id
bookRouter.get("/author/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        const books = await BookService.listBooksByAuthor(id);
        return response.status(200).json(books);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});


// GET: A book based on the id
bookRouter.get("/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        const book = await BookService.getBook(id);
        if (book) {
            return response.status(200).json(book);
        }
        return response.status(404).json("Book could not be found");
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});


// POST: Create a Book
// Params: title, authorId, datePublished, isFiction
bookRouter.post(
    "/",
    body("title").isString(),
    body("authorId").isInt(),
    body("datePublished").isDate().toDate(),
    body("isFiction").isBoolean(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }
        try {
            const book = request.body;
            const author = await AuthorService.getAuthor(book.authorId);
            if (author) {
                const newBook = await BookService.createBook(book);
                return response.status(201).json(newBook);
            }
            return response.status(404).json("Author could not be found");
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);


// PUT: Update book
// Params: title, authorId, datePublished, isFiction
bookRouter.put(
    "/:id",
    body("title").isString(),
    body("authorId").isInt(),
    body("datePublished").isDate().toDate(),
    body("isFiction").isBoolean(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }
        const id: number = parseInt(request.params.id, 10);
        try {
            const bookExist = await BookService.getBook(id);
            if (bookExist) {
                const book = request.body;
                const updatedBook = await BookService.updateBook(book, id);
                return response.status(201).json(updatedBook);
            }
            return response.status(404).json("Book could not be found");
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);


bookRouter.delete("/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        const bookExist = await BookService.getBook(id);
        if (bookExist) {
            await BookService.deleteBook(id);
            return response.status(200).json("Book was successfully deleted");
        }
        return response.status(404).json("Book could not be found");
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});
