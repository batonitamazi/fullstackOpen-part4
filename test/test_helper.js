const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'about lord of the rings',
        author: 'tamaz mirianashvili',
        url: 'about-lord-of-the-rings',
        likes: 10000
    },
    {
        title: 'about game of thrones',
        author: 'tamaz mirianashvili',
        url: 'about-game-of-thrones',
        likes: 5000
    },
]
const nonExistingId = async () => {
    const blog = new Blog({title: 'about Vefkhistkaosani'})
    await blog.save()
    await blog.remove()
    return note._id.toString()
}
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}
module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}