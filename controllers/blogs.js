const blogRouter = require("express").Router();
const { request, response } = require("../app");
const blog = require("../models/blog");
const Blog = require("../models/blog");
const mongoose = require("mongoose");

blogRouter.get("/info", (request, response) => {
  response.send("<h1>Blog info page</h1>");
});

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  blog ? response.json(blog) : response.status(404).end();
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  const entradaNueva = await blog.save(); // Guardar la petición en la base de datos
  response.status(201).json(entradaNueva); // Responder con el blog guardado
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.status(200).json(updateBlog);
});

module.exports = blogRouter;
