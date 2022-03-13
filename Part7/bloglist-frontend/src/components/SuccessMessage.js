import React from 'react'
import { useSelector } from 'react-redux'

const SuccessMessage = () => {
  const notification = useSelector(state => state.notifications.text)
  if (notification === null) { //null message removes the notification
    return null
  }
  return (
    <div className='success'>
      {notification}
    </div>
  )
}


export default SuccessMessage