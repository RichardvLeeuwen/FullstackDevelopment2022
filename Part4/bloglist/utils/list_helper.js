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

const mostLikes = (blogs) => {
  for (let i = 0; i < blogs.length; i++) {
    for (let j = 0; j < blogs.length; j++ ) {
      if(blogs[i].author === blogs[j].author && i !== j && blogs[i].likes !== 0 && blogs[j].likes !==0) {
        blogs[i].likes = blogs[i].likes + blogs[j].likes
        blogs[j].likes = 0
      }
    }
  }
  let x = 0
  let max = 0
  for (let i = 0; i < blogs.length; i++) {
    if(blogs[i].likes > max) {
      max = blogs[i].likes
      x = i
    }
  }
  const mAuthor = blogs[x].author
  const mLikes = blogs[x].likes
  const ob = {author : mAuthor, likes: mLikes }
  return ob
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}