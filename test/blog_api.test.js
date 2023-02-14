const mongoose = require("mongoose");
const Blog = require("../models/blog");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

// test('blogsa are returned as json', async() => {
//     await api
//         .get('/api/blogs')
//         .expect(200)
//         .expect('Content-Type', /application\/json/)
// }, 100000)
// afterAll(async () => {
//     await mongoose.connection.close()
// })

// test("there are two blogs", async () => {
//     const response = await api.get('/api/blogs')
//     expect(response.body).toHaveLength(2)
// })
// test('the first blog is about author', async () => {
//     const response = await api.get('/api/blogs')
//     expect(response.body[0].title).toBe('about lord of the rings')
// })
// test('all blogs are returned', async () => {
//     const response = await api.get('/api/blogs')
//     expect(response.body).toHaveLength(helper.initialBlogs.length)
// })
// test('a specific blog is within the returned blogs', async () => {
//     const response = await api.get('/api/blogs')

//     const titles = response.body.map(r => r.title)
//     expect(titles).toContain('about lord of the rings')
// })

// test('a valid blog can be added', async () => {
//     const newBlog = {
//         title: 'about ulise',
//         author: 'tamaz mirianashvili',
//         url: 'about-ulise',
//         likes: 15000
//     }
//     await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(201)
//         .expect('Content-Type', /application\/json/)

//     const blogsAtEnd = await helper.blogsInDb()
//     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
//     const titles = blogsAtEnd.map(blog => blog.title)
//     expect(titles).toContain(
//         'about ulise'
//     )
// })
// test('blog without title is not added', async() => {
//     const newBlog = {
//     }
//     await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(201)

//     const blogsAtEnd = await helper.blogsInDb()
//     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
// })

describe("when there is initially one user in database", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLeyngth(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  }, 25000)
  test('creation fails with proper statuscode and message if password length is shorter than it must be', async () => {
    const newuser = {
      username: "tamzikoo",
      name: "tamaz_batoni",
      password: "21"
    }
    const result = await api
      .post('/api/users')
      .expect(401)
      .expect('Content-Type', /application\/json/)

      .expect(result.body.error).toContain("password must be longer than 3 characters")
  })
});

afterAll(async () => {
  await mongoose.connection.close();
});
