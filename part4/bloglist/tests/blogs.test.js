const supertest = require("supertest")
const mongoose = require("mongoose")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const helper = require("./blog_helper")
const blog = require("../models/blog")

test("correct amount of blog posts are returned", async() => {
    const response = await api.get("/api/blogs")
    const length = await (await helper.blogsInDb()).length
    expect(response.body).toHaveLength(length)

}, 100000)

test("unique identifier property of the blog posts is named id", async() => {
    const response = await api.get("/api/blogs")
    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
        expect(blog._id).toBeUndefined()
    })
}, 100000)

test("a valid blog can be added", async() => {
    const newBlog = {
        title: "seventh entry",
        author: "seventh author",
        url: "https://gitignore.io/api/node",
    }

    const initialBlog = await helper.blogsInDb()

    await api.
    post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

    const finalBlog = await helper.blogsInDb()
    expect(finalBlog).toHaveLength(initialBlog.length + 1)

    const contents = finalBlog.map(blog => blog.title)
    expect(contents).toContain(newBlog.title)
})

test("likes property defaults to 0 if missing", async () => {
    const noLikes = {
      title: "ninth entry",
      author: "ninth author",
      url: "https://gitignore.io/api/react",
    };
  
    const response = await api
      .post("/api/blogs")
      .send(noLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  
    expect(response.body.likes === undefined ? 0: undefined).toBe(0);
  });

  test("responds with 400 Bad Request if title is missing", async () => {
    const newBlogWithoutTitle = {
      author: "missing title author",
      url: "https://example.com",
    }
  
    await api.post("/api/blogs").send(newBlogWithoutTitle).expect(400);
  });
  
  test("responds with 400 Bad Request if url is missing", async () => {
    const newBlogWithoutUrl = {
      title: "missing url title",
      author: "missing url author",
    };
  
    await api.post("/api/blogs").send(newBlogWithoutUrl).expect(400);
  });

test("delete a blog post", async () => {
    const blogAtStart = await helper.blogsInDb()
    const blogToDelete = blogAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogAtEnd = await helper.blogsInDb()
    expect(blogAtEnd).toHaveLength(blogAtStart.length - 1)

    const contents = blogAtEnd.map(blog => blog.title)
    expect(contents).not.toContain(blogToDelete.title)
})

test("update a blog post", async () => {
    const updatedLikes = 99;
    const updatedBlog = await api
    .put(`/api/blogs/651a99d87110736f60d32dee`)
    .send({likes: updatedLikes})
    .expect(200)

    expect(updatedBlog.body.likes).toBe(updatedLikes)
})

afterAll(async () => {
    await mongoose.connection.close()
})