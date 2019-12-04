const todoModel = require('../model/todo.model')

exports.createTodo = (req, res) => {
    todoModel.create(req.body)
    res.status(201).json({message: 'probando test'})
}

