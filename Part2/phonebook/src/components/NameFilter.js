import React from 'react'

const NameFilter = ({inputNameValue, inputNameChangeFunc }) => {
  const formTitle = "filter shown with"

  return (
    <div>
      {formTitle} <input value={inputNameValue} onChange={inputNameChangeFunc}/>        
    </div>
  )
}

export default NameFilter