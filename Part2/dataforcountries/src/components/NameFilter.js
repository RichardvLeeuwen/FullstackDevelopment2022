import React from 'react'

const NameFilter = ({inputNameValue, inputNameChangeFunc }) => {
  const formTitle = "find countries"

  return (
    <div>
      {formTitle} <input value={inputNameValue} onChange={inputNameChangeFunc}/>        
    </div>
  )
}

export default NameFilter