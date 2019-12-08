const request = require('supertest')
const endpointUrl = "/todos/"
const app = require('../../app')
const newTodo = require('../mock/new-todo.json')

let firstTodo, newTodoId

describe(endpointUrl, () => {
    it('get'+endpointUrl, async() => {
        const response = await request(app).get(endpointUrl)
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body[0].title).toBeDefined()
        expect(response.body[0].done).toBeDefined()
        firstTodo = response.body[0]
    })

    it('get by id'+endpointUrl+':todoId', async() => {
        const response = await request(app).get(endpointUrl+firstTodo._id)
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toBe(firstTodo.title)
        expect(response.body.done).toBe(firstTodo.done)
    })

    it('get todo by id doesnt exist'+endpointUrl, async() => {
        const response = await request(app).get(endpointUrl+'5de84a81540c39283c65588a')
        expect(response.statusCode).toBe(404)
    })

    it('post'+endpointUrl, async() => {
        const response = await request(app)
            .post(endpointUrl)
            .send(newTodo)
        expect(response.statusCode).toBe(201)
        expect(response.body.title).toBe(newTodo.title)
        expect(response.body.done).toBe(newTodo.done)
        newTodoId = response.body._id
    })

    it('should return error 500 on malformed data with post'+endpointUrl, async() => {
        const response = await request(app)
            .post(endpointUrl)
            .send({title: 'missing done property'})
        expect(response.statusCode).toBe(500)
        expect(response.body).toStrictEqual({message: 'Todo validation failed: done: Path `done` is required.'}) 
    })

    it('put '+endpointUrl, async() => {
        const testTodo = {title: 'maka int put test', done: true}
        const res = await request(app)
            .put(endpointUrl+newTodoId)
            .send(testTodo)
        expect(res.statusCode).toBe(200)
        expect(res.body.title).toBe(testTodo.title)
        expect(res.body.done).toBe(testTodo.done)
    })
})
