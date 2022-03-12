import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  text : null
}
const notiSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNoti(state, action) {
      const newNote = {
        text: action.payload
      }
      return newNote
    },
    removeNoti(state) {
      return {
        text: null
      }
    }
  },
})

export const {setNoti, removeNoti} = notiSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(setNoti(`${message}`))
    setTimeout(() => {
        dispatch(removeNoti())
    }, time*1000)
  }
}
export default notiSlice.reducer