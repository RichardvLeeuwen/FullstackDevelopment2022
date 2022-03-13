import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  text : null,
  timeoutID: null
}
const notiSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNoti(state, action) {
      const newNote = {
        text: action.payload.data,
        timeoutID: action.payload.tid
      }
      return newNote
    },
    removeNoti(state) {
      return {
        text: null
      }
    },
    resetTimer(state) {
      clearTimeout(state.timeoutID)
    }
  },
})

export const {setNoti, removeNoti, resetTimer} = notiSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(resetTimer())
    const id = setTimeout(() => {
        dispatch(removeNoti())
    }, time*1000)
    dispatch(setNoti({data:`${message}`, tid:id }))
  }
}
export default notiSlice.reducer