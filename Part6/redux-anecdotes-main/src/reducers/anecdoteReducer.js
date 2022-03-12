import {createSlice} from '@reduxjs/toolkit'
import anecService from '../services/anecdotes'

const anecSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const anecId = action.payload
      const votedAnec = state.find(anec => anec.id === anecId)
      const newAnec = {...votedAnec, votes: votedAnec.votes + 1}
      return state.map(anec => anec.id === anecId ? newAnec : anec)
    },
    addAnec(state, action) {
      state.push(action.payload)
    },
    setAnec(state, action) {
      return action.payload
    },
  },
})

export const {vote, addAnec, setAnec} = anecSlice.actions

export const initAnec = () => {
  return async dispatch => {
    const anecdotes = await anecService.getAll()
    dispatch(setAnec(anecdotes))
  }
}

export const newAnec = anec => {
  return async dispatch => {
    const anecdote = await anecService.createNew(anec)
    dispatch(addAnec(anecdote))
  }
}

export const upvote = id => {
  return async dispatch => {
    await anecService.updateAnec(id)
    dispatch(vote(id))
  }
}

export default anecSlice.reducer