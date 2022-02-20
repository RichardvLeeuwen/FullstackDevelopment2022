const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  const fav = blogs.reduce((sum, item) => {
    return sum.likes > item.likes ? sum : item
  })

  return [fav.title, fav.author, fav.likes]
}

const mostBlogs = (blogs) => {
  const fav = lodash.countBy(blogs, 'author')
  const values = Object.values(fav)
  const mostBlogs = Math.max(...values)
  const author = lodash.findKey(fav, function(o)  {return o === mostBlogs} )

  return {author, mostBlogs}
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}