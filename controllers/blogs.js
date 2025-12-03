const blogRouter = require("express").Router();
const blog = require("../models/blog");
const Blog = require("../models/blog");

blogRouter.get("/info", (request, response) => {
  response.send("<h1>Blog info page</h1>");
});

blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if(blog) {
        response.json(blog); //devuelve el blog si lo encuentra, reponse.json lo convierte a formato json
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogRouter.post("/", (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((entradaNueva) => {
      response.json(entradaNueva);
    })
    .catch((error) => next(error));
});

module.exports = blogRouter;
