import {Request, Response} from 'express'
import * as categoriesService from './category.service'


export const createCategory = async (request: Request, response: Response) => {
    const newCategory = await categoriesService.createCategory(request.body)
    return response.json(newCategory);
}


export const getCategories = async (request: Request, response: Response) => {
    const categories = await categoriesService.getCategories()
    return response.json(categories)
}


export const getOneCategory = async (request: Request, response: Response) => {
    const {id} = request.params
    const category = await categoriesService.getOneCategory(Number(id))
    return response.json(category)
}


export const updateCategory = async (request: Request, response: Response) => {
    const {id} = request.params
    const {parentCategoryId, ...categoryDTO} = request.body
    const updatedCategory = await categoriesService.updateCategory(Number(id), {
        ...categoryDTO,
        parentCategory: parentCategoryId === null ? {disconnect: true} : {connect: {id: parentCategoryId}}
        //parentCategoryId: parentCategoryId
    })
    return response.json(updatedCategory)
}


export const deleteCategory = async (request: Request, response: Response) => {
    const {id} = request.params
    const deletedCategory = await categoriesService.deleteCategory(Number(id))
    return response.json(deletedCategory)
}