const todoModel = require('../model/todo.model')

exports.getTodoById = async(req, res, next) => {
    try{
        const model = await todoModel.findById(req.params.todoId)
        if(model){
            res.status(200).json(model)
        }else {
            res.status(404).send()
        }
    }catch(err) {
        next(err)
    }
}

exports.getTodos= async(req, res, next) => {
    try{
        const allTodos = await todoModel.find({})
        res.status(200).json(allTodos)
    }catch(err){
        next(err)
    }
}

exports.createTodo = async(req, res, next) => {
    try{
        const createModel = await todoModel.create(req.body)
        res.status(201).json(createModel)
    }catch(err){
        next(err)
    }
}

exports.updateTodo = async(req, res, next) => {
    try{
        const updateTodo = todoModel.findByIdAndUpdate(req.params.todoId, req.body, {
            new: true, useFindAndModify: false
        })
        if(updateTodo){
            res.status(200).json(updateTodo)
        }else{
            res.status(404).send()
        }
    }catch(err){
        next(err)
    }
}

exports.deleteTodo = async(req, res, next) => {
    try{
        const deleteTodo = await todoModel.findByIdAndRemove(req.params.todoId)
        if(deleteTodo) {
            res.status(200).json(deleteTodo)
        }else {
            res.status(404).send()
        } 
    }catch(err){
        next(err)
    } 
}
