const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const supertest = require("supertest");
const helper = require("../tests/test_helper");
const app = require("../app");
const { title } = require("node:process");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const noteObject = helper.blogs.map((blog) => new Blog(blog));
  const promiseArray = noteObject.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("Blogs API tests", async () => {
  const blogs = await helper.notesInDb();
  assert.strictEqual(blogs.length, helper.blogs.length);
});
after(async () => {
  mongoose.connection.close();
});

test("Parametro .id existente", async () => {
  const blogs = await helper.notesInDb();

  blogs.forEach((blog) => {
    assert.ok(blog.id);
  });
});
after(async () => {
  mongoose.connection.close();
});

test("Nuevo Blog añadido", async () => {
  const blogObject = {
    title: "Nuevo Blog",
    author: "Emiliana",
    url: "Indefinida",
    likes: 35,
  };

  await api
    .post("/api/blogs")
    .send(blogObject)
    .expect(201)
    .expect("content-Type", /application\/json/);
  const blogsFinales = await helper.notesInDb();
  assert.strictEqual(blogsFinales.length, helper.blogs.length + 1);

  const blogEntrada = blogsFinales.map((b) => b.title);
  assert(blogEntrada.includes("Nuevo Blog"));
});
after(async () => {
  mongoose.connection.close();
});

test("Blog eliminado correctamente", async () => {
  const blogsIniciales = await helper.notesInDb();
  const blogEliminar = blogsIniciales[1];
  await api.delete(`/api/blogs/${blogEliminar.id}`).expect(204);
  const blogsFinales = await helper.notesInDb();
  assert.strictEqual(blogsFinales.length, helper.blogs.length - 1);
});

test("Blog actualizado correctamente", async () => {
  const blogsIniciales = await helper.notesInDb();
  const blogActualizar = blogsIniciales[1];

  const blogObject = {
    title: "Blog actualizado 2",
    author: "Single Letshe",
    url: "Wolfiezzz",
    likes: 9,
  };
  await api.put(`/api/blogs/${blogActualizar.id}`).send(blogObject).expect(200);
  const blogsFinales = await helper.notesInDb();
  assert.strictEqual(blogObject.title, blogsFinales[1].title);
});
