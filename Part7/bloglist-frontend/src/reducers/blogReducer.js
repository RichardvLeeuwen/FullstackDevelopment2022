import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    vote(state, action) {
      const blogId = action.payload
      const votedBlog = state.find(blog => blog.id === blogId)
      const newBlog = { ...votedBlog, votes: votedBlog.votes + 1 }
      return state.map(blog => blog.id === blogId ? newBlog : blog)
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    setBlog(state, action) {
      return action.payload
    },
  },
})

export const { vote, addBlog, setBlog } = blogSlice.actions

export const initBlog = () => {
  return async dispatch => {
    const blog = await blogService.getAll()
    dispatch(setBlog(blog))
  }
}

export const newBlog = anec => {
  return async dispatch => {
    const blog = await blogService.createBlog(anec)
    dispatch(addBlog(blog))
  }
}

export const upvote = id => {
  return async dispatch => {
    await blogService.updateBlog(id)
    dispatch(vote(id))
  }
}

export default blogSlice.reducer