import request from 'supertest'
import {app, prisma} from '../src/app'


beforeAll(async () => {
    console.log(process.env.DB_URL)
    await prisma.user.deleteMany({})
})

afterAll(async () => {
    await prisma.$disconnect()
})


const userDto = {
    name: 'user 1',
    email: 'user1@a.com',
}

let user: { id: number, name: string, email: string }


test('a user is added successfully', async () => {
    const response = await request(app)
        .post('/user')
        .send(userDto)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)

    expect(response.body.id).toBeDefined()
    user = response.body
})


test('a user with the same email is rejected', () => {
    return request(app)
        .post('/user')
        .send(userDto)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(409)
})


test('correct list of users returned', async () => {
    const response = await request(app)
        .get('/user')
        .expect('Content-Type', /json/)
        .expect(200)

    expect(response.body).toBeDefined()
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body.length).toBe(1)
})


test('correct user returned', async () => {
    const response = await request(app)
        .get(`/user/${user.id}`)
        .expect('Content-Type', /json/)
        .expect(200)

    expect(response.body).toBeDefined()
    expect(response.body).toEqual(user)
})

test('user not found', async () => {
    const response = await request(app)
        .get(`/user/${user.id+1}`)
        .expect('Content-Type', /json/)
        .expect(404)

    expect(response.body).toBeDefined()
    expect(response.body).toEqual({error: 'Not found!'})
})