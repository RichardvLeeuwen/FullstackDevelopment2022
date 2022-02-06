import React from 'react'

const SuccessMessage = ({ message }) => {
  if (message === null) { //null message removes the notification
    return null
  }
  return (
    <div className='success'>
      {message}
    </div>
  )
}


export default SuccessMessage