import { createCategory, deleteCategory, getOneCategory, getCategories, updateCategory } from './category.controller'
import { Router } from 'express'

export const router = Router()

router.post('/', createCategory)

router.get('/', getCategories)
router.get('/:id', getOneCategory)

router.put('/:id', updateCategory)

router.delete('/:id', deleteCategory)