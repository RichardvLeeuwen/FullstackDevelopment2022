import React from 'react'

const PhoneForm = ({submitFunc, inputNameValue, inputNameChangeFunc,inputPhoneValue, inputPhoneChangeFunc }) => {
  return (
    <form onSubmit={submitFunc}>
      <div>
        name: <input value={inputNameValue} onChange={inputNameChangeFunc}/>
        <br></br>
        number: <input value={inputPhoneValue} onChange={inputPhoneChangeFunc}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PhoneForm