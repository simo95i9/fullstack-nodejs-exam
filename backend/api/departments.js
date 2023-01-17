import { Router } from 'express'
export const router = Router()


import { connection } from "../datastore.js"
const Department = connection.models['Department']


// Return all departments
router.get('/', async (req, res) => {
    const departments = await Department.find({})
    console.log('all departments: ', departments)
    res.send(departments)
})

// Return department by id
router.get('/:id', async (req, res) => {
    const department = await Department.findOne({ _id: req.params.id })
    console.log('found department by id: ', department)
    res.send(department)
})

// Remove department by id
router.delete('/:id/', async (req, res) => {
    const result = await Department.deleteOne({ _id: req.params.id })
    res.send(result)
})
