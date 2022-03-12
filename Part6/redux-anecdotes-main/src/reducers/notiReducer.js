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
export default notiSlice.reducer