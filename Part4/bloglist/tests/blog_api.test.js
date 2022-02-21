const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
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
        title: 'Note 2',
        author: 'Tester2',
        url: 'Note2.com',
        likes: 2,
    },
]

beforeEach(async () => { //similar to the tutorial of part 4 "Testing the backend"
    await Blog.deleteMany({})
    await User.deleteMany({})
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
    test(`blogs have 'id' property`, async () => {
        const reply = await api.get('/api/blogs')
        expect(reply.body[0].id).toBeDefined() //grabs a blog, checks if id property is defined

    })
})

describe('POST blog', () => {
    test('Verify POST blog works', async () => { //as seen in tutorial
        const postBlog = {
            title: 'POST Note',
            author: 'Poster',
            url: 'POST.com',
            likes: 10,
        }
        await api.post('/api/blogs').send(postBlog).expect(201).expect('Content-Type', /application\/json/) //checks if POST request succeeds

        const reply = await api.get('/api/blogs')
        expect(reply.body).toHaveLength(twoBlogs.length + 1) //checks that number of blogs is increased by one

        const titles = reply.body.map(blog => blog.title) //checks the content
        const authors = reply.body.map(blog => blog.author)
        const urls = reply.body.map(blog => blog.url)
        const likesAll = reply.body.map(blog => blog.likes)
        expect(titles).toContain('POST Note')
        expect(authors).toContain('Poster')
        expect(urls).toContain('POST.com')
        expect(likesAll).toContain(10)
    })
    test('Verify POST blog with no likes defaults to 0', async () => { //as seen in tutorial
        const postBlog = {
            title: 'POST Note2',
            author: 'Poster2',
            url: 'POST2.com',
        }
        await api.post('/api/blogs').send(postBlog).expect(201).expect('Content-Type', /application\/json/) //checks if POST request succeeds

        const reply = await api.get('/api/blogs')
        expect(reply.body).toHaveLength(twoBlogs.length + 1) //checks that number of blogs is increased by one

        const titles = reply.body.map(blog => blog.title) //checks the content
        const authors = reply.body.map(blog => blog.author)
        const urls = reply.body.map(blog => blog.url)
        const likesAll = reply.body.map(blog => blog.likes)
        expect(titles).toContain('POST Note2')
        expect(authors).toContain('Poster2')
        expect(urls).toContain('POST2.com')
        expect(likesAll).toContain(0)
    })
    test('Verify POST blog with no title and url results in a bad request', async () => { //as seen in tutorial
        const postBlog = { //missing title and url
            author: 'Poster2',
            likes: 10,
        }
        await api.post('/api/blogs').send(postBlog).expect(400) //checks if POST request succeeds
    })
})

describe('DELETE blog', () => {
    test('Deleted blog successfully', async () => { //as seen in tutorial
        const reply = await api.get('/api/blogs')
        const id = reply.body[0].id
        await api.delete(`/api/blogs/${id}`).expect(204)
        const reply2 = await api.get('/api/blogs')
        expect(reply2.body).toHaveLength(twoBlogs.length - 1) //checks that number of blogs is decreased by one
    })
})

describe('PUT blog', () => {
    test('Updated blog likes successfully', async () => { //as seen in tutorial
        const reply = await api.get('/api/blogs')
        const id = reply.body[0].id

        const putBlog = {
            title: 'Note 1',
            author: 'Tester1',
            url: 'Note1.com',
            likes: 10, //from 1 to 10
        }

        await api.put(`/api/blogs/${id}`).send(putBlog)
        const reply2 = await api.get('/api/blogs')

        const titles = reply2.body.map(blog => blog.title) //checks the content with updated likes
        const authors = reply2.body.map(blog => blog.author)
        const urls = reply2.body.map(blog => blog.url)
        const likesAll = reply2.body.map(blog => blog.likes)
        expect(titles).toContain('Note 1')
        expect(authors).toContain('Tester1')
        expect(urls).toContain('Note1.com')
        expect(likesAll).toContain(10)
    })
})

describe('POST user', () => {
    test('Verify POST user works', async () => { //as seen in tutorial
        const newUser = {
            username: 'root',
            name: 'test',
            passwordHash: 'tester',
        }
        await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)
        await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/) //checks if POST request succeeds
        const reply = await api.get('/api/users')
        expect(reply.body).toHaveLength(1) //checks that number of users is increased by one

        const usernames = reply.body.map(user => user.username) //checks the content
        const names = reply.body.map(user => user.name)
        expect(usernames).toContain('root')
        expect(names).toContain('test')
    })
    test('Verify POST blog with no username', async () => { //as seen in tutorial
        const user = {
            name: 'test',
            passwordHash: 'test'
        }
        await api.post('/api/users').send(user).expect(400) //checks if POST request succeeds
    })
})

afterAll(() => {
    mongoose.connection.close()
})