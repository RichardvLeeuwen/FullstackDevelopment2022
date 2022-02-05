import React from 'react'

const FailureMessage = ({ message }) => {
  if (message === null) { //null message removes the notification
    return null
  }
  return (
    <div className='failure'>
      {message}
    </div>
  )
}


export default FailureMessage