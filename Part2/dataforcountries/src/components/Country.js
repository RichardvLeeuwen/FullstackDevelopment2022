import React from 'react'
import Button from './Button'

const Country = ({ name, filFunc }) => {
  const buttonText = 'show'
  return (
    <div>
      {name}
      <Button clickFunc={filFunc} description={buttonText} name={name}/>
    </div>
  )
}


export default Country