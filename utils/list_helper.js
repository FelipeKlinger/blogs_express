const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0); // suma los likes de todos los blogs en la lista
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const favorite = blogs.reduce((favorite, item) => {
    return item.likes > favorite.likes ? item : favorite; // devuelve el blog con más likes
  });

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
