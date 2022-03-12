import {createSlice} from '@reduxjs/toolkit'

const initialState = "This is a notification"
const notiSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNoti(state, action) {
    },
    removeNoti(state, action) {
    }
  },
})

export const {setNoti, removeNoti} = notiSlice.actions
export default notiSlice.reducer