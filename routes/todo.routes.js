const router = require('express').Router()
const todoController = require('../controllers/todo.controller')

router.get('/', todoController.getTodos)

router.get('/:todoId', todoController.getTodoById)

router.post('/', todoController.createTodo)

router.put('/:todoId', todoController.updateTodo)

module.exports = router