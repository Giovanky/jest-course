const todoController = require('../../controllers/todo.controller')
const todoModel = require('../../model/todo.model')
const httpMocks = require('node-mocks-http')
const newTodo = require('../mock-data/new-todo')

todoModel.create = jest.fn()

let req, res, next
beforeEach(() => {
    req = httpMocks.createRequest
    res = httpMocks.createResponse
    next = null
})

describe('todoController.createTodo', () => {
    it('should have a create todo function', () => {
        expect(typeof todoController.createTodo).toBe('function')
    })

    it('should call todoModel create', () => {
        req.body = newTodo
        todoController.createTodo(req, res, next)
        expect(todoModel.create).toBeCalledWith(newTodo)
    })

    it('should return 201 response code', () => {
        req.body = newTodo
        todoController.createTodo(req, res, next)
        expect(res.statusCode).toEqual(201)
        expect(res._isEndCalled()).toBeTruthy()
    })
})