const todoController = require('../../controllers/todo.controller')
const todoModel = require('../../model/todo.model')
const httpMocks = require('node-mocks-http')
const newTodo = require('../mock/new-todo')
const allTodos = require('../mock/all-todos')

todoModel.create = jest.fn()
todoModel.find = jest.fn()
todoModel.findById = jest.fn()
todoModel.findByIdAndUpdate = jest.fn()

let req, res, next
const todoId = '5de84a81540c39283c65544c'

beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = jest.fn()
    req.params.todoId = todoId
    req.body = newTodo
})

describe('todoController.getById', () => {
    it('should have a getTodoById', () => {
        expect(typeof todoController.getTodoById).toBe('function')
    })

    it('should call todoModel.findById with route parameters', async() => {
        req.params.todoId = todoId
        await todoController.getTodoById(req, res, next)
        expect(todoModel.findById).toBeCalledWith(todoId)
    })

    it('should return json body and response code 200', async() => {
        todoModel.findById.mockReturnValue(newTodo)
        await todoController.getTodoById(req, res, next)
        expect(res.statusCode).toBe(200)
        expect(res._getJSONData()).toStrictEqual(newTodo)
        expect(res._isEndCalled()).toBeTruthy()
    })

    it('should handle errors', async() => {
        const errorMessage = {message: 'error finding todoModel'}
        const rejectedPromise = Promise.reject(errorMessage)
        todoModel.findById.mockReturnValue(rejectedPromise)
        await todoController.getTodoById(req, res, next)
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
})

describe('todoController.getTodos', () => {
    it('should have a getTodos function', () => {
        expect(typeof todoController.getTodos).toBe('function')
    })

    it('shoul call todoModel.find({})', async() => {
        await todoController.getTodos(req, res, next)
        expect(todoModel.find).toHaveBeenCalledWith({})
    })

    it('should return response with status 200 and all todos', async() => {
        todoModel.find.mockReturnValue(allTodos)
        await todoController.getTodos(req, res, next)
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy()
        expect(res._getJSONData()).toStrictEqual(allTodos)
    })

    it('should handle errors', async() => {
        const errorMessage = {message: 'error finding all todos'}
        const rejectedPromise = Promise.reject(errorMessage)
        todoModel.find.mockReturnValue(rejectedPromise)
        await todoController.getTodos(req, res, next)
        expect(next).toHaveBeenCalledWith(errorMessage)
    })

    it('should return 404 when item doesnt exist', async() => {
        todoModel.findById.mockReturnValue(null)
        await todoController.getTodoById(req, res, next)
        expect(res.statusCode).toBe(404)
        expect(res._isEndCalled()).toBeTruthy()
    })
})

describe('todoController.createTodo', () => {
    beforeEach(() => {
        req.body = newTodo
    })

    it('should have a create todo function', () => {
        expect(typeof todoController.createTodo).toBe('function')
    })

    it('should call todoModel create', () => {
        todoController.createTodo(req, res, next)
        expect(todoModel.create).toBeCalledWith(newTodo)
    })

    it('should return 201 response code', async() => {
        await todoController.createTodo(req, res, next)
        expect(res.statusCode).toEqual(201)
        expect(res._isEndCalled()).toBeTruthy()
    })

    it('should return json body in response',async () => {
        todoModel.create.mockReturnValue(newTodo)
        await todoController.createTodo(req, res, next)
        expect(res._getJSONData()).toStrictEqual(newTodo)
    })

    it('should handle errors', async() => {
        const errorMessage = {message: 'done property missing'}
        const rejectedPromise = Promise.reject(errorMessage)
        todoModel.create.mockReturnValue(rejectedPromise)
        await todoController.createTodo(req, res, next)
        expect(next).toBeCalledWith(errorMessage)
    })
})

describe('todoController.updateTodo', () => {
    it('should have a updateTodo function', () => {
        expect(typeof todoController.updateTodo).toBe('function')
    })

    it('should update with todoModel.findByIdAndUpdate', async() => {
        await todoController.updateTodo(req, res, next)
        expect(todoModel.findByIdAndUpdate).toHaveBeenCalledWith(todoId, newTodo, {
            new: true, useFindAndModify: false
        })
    })

    it('should return a response with json data and http code 200', async() => {
        todoModel.findByIdAndUpdate.mockReturnValue(newTodo)
        await todoController.updateTodo(req, res, next)
        expect(res._isEndCalled()).toBeTruthy()
        expect(res.statusCode).toBe(200)
        expect(res._getJSONData()).toStrictEqual(newTodo)
    })

    it('should handle error', async() => {
        const errorMessage = {message: 'updateTodo failed'}
        const rejectedPromise = Promise.reject(errorMessage)
        todoModel.findById.mockReturnValue(rejectedPromise)
        await todoController.getTodoById(req, res, next)
        expect(next).toHaveBeenCalledWith(errorMessage)
    })

    it('should return 404 when item doesnt exist', async() => {
        todoModel.findByIdAndUpdate.mockReturnValue(null)
        await todoController.updateTodo(req, res, next)
        expect(res.statusCode).toBe(404)
        expect(res._isEndCalled()).toBeTruthy()
    })
})

describe('todoController.delete todo', () => {
    it('should deleteTodo exist', async() => {
        expect(typeof todoController.deleteTodo).toBe('function')
    })
})