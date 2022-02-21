const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const twoBlogs = [
    {
        title: 'Note 1',
        author: 'Tester1',
        url: 'Note1.com',
        likes: 1,
    },
    {
        title: 'Note 1',
        author: 'Tester1',
        url: 'Note1.com',
        likes: 1,
    },
]

beforeEach(async () => { //similar to the tutorial of part 4 "Testing the backend"
    await Blog.deleteMany({})
    const testBlogs = twoBlogs.map(blog => new Blog(blog)) //create blog objects
    const savedBlogs = testBlogs.map(blog => blog.save()) //save them
    await Promise.all(savedBlogs) //create single promise for array of save promises
})

describe('GET blogs', () => {
    test('blogs are json', async () => { //as seen in tutorial
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    })
    test('all two blogs are returned', async () => {
        const reply = await api.get('/api/blogs')
        expect(reply.body).toHaveLength(twoBlogs.length)
    })
})
afterAll(() => {
    mongoose.connection.close()
})