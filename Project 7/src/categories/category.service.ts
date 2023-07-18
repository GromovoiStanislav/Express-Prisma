import {prisma} from '../config'


export const createCategory = async (categoryDTO: any) => {
    return prisma.category.create({
        data: categoryDTO,
    })
}


export const getCategories = async () => {
    return prisma.category.findMany({
        include: {
            books: true,
            subCategories: true,
            parentCategory: true
        },
        orderBy: {
            id: "asc"
        }
    })
}


export const getOneCategory = async (id: number) => {
    return prisma.category.findUnique({
        where: {id},
        include: {
            books: true,
            subCategories: true,
            parentCategory: true
        }
    })
}


export const updateCategory = async (id: number, categoryDTO: any) => {
    return prisma.category.update({
        data: categoryDTO,
        where: {id},
        include: {subCategories: true, parentCategory: true}
    })
}


export const deleteCategory = (id: number) => {
    return prisma.category.delete({
        where: {id}
    })
}