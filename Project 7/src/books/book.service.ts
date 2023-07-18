import {prisma} from '../config'


export const createBook = async (bookDTO: any) => {
    return prisma.book.create({
        data: bookDTO,
        include: {
            author: true,
            categories: true
        }
    })
}


export const getBooks = async () => {
    return prisma.book.findMany({
        include: {
            author: true,
            categories: true
        },
        orderBy: {
            id: "asc"
        }
    })
}


export const getOneBook = async (id: number) => {
    return prisma.book.findUnique({
        where: {id},
        include: {
            author: true,
            categories: true
        }
    })
}


export const updateBook = async (id: number, bookDTO: any) => {
    return prisma.book.update({
        where: {id},
        data: bookDTO,
        include: {
            author: true,
            categories: true
        }
    })
}


export const deleteBook = async (id: number) => {
    return prisma.book.delete({
        where: {id}
    })
}