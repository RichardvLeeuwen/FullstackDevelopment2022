import React from 'react'
import Button from './Button'

const Person = ({ name, number, deleteFunc }) => {
  return (
    <div>
      <p>
        {name} {number} <Button clickFunc={() => deleteFunc(name)} description='delete'/>
      </p>
    </div>
  )
}


export default Person