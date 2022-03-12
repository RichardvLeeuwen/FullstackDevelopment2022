import {createSlice} from '@reduxjs/toolkit'
import anecService from '../services/anecdotes'

const anecSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnec(state, action) {
      state.push(action.payload)
    },
    upvote(state, action) {
      const anecId = action.payload
      const votedAnec = state.find(anec => anec.id === anecId)
      const newAnec = {...votedAnec, votes: votedAnec.votes + 1}
      return state.map(anec => anec.id === anecId ? newAnec : anec)
    },
    addAnec(state, action) {
      state.push(action.payload)
    },
    setAnec(sate, action) {
      return action.payload
    }
  },
})

export const {newAnec, upvote, addAnec, setAnec} = anecSlice.actions

export const initAnec = () => {
  return async dispatch => {
    const anecdotes = await anecService.getAll()
    dispatch(setAnec(anecdotes))
  }
}

export default anecSlice.reducer