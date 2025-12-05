const blogRouter = require("express").Router();
const blog = require("../models/blog");
const Blog = require("../models/blog");

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

module.exports = blogRouter;
