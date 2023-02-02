const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)


// beforeEach(async () => {
//     await Blog.deleteMany({})
//     let newObject = new Blog(helper.initialBlogs[0])
//     await newObject.save()
//     newObject = new Blog(helper.initialBlogs[1])
//     await newObject.save()
// })

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

// test('blogsa are returned as json', async() => {
//     await api 
//         .get('/api/blogs')
//         .expect(200)
//         .expect('Content-Type', /application\/json/)
// }, 100000)
// afterAll(async () => {
//     await mongoose.connection.close()
// })

test("there are two blogs", async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})
test('the first blog is about author', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].title).toBe('about lord of the rings')
})
test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})
test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain('about lord of the rings')
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'about ulise',
        author: 'tamaz mirianashvili',
        url: 'about-ulise',
        likes: 15000
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(
        'about ulise'
    )
})
test('blog without title is not added', async() => {
    const newBlog = {
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

afterAll(async () => {
    await mongoose.connection.close()
  })