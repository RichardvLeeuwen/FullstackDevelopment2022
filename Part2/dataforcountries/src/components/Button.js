import React from 'react'

const Button = ({ clickFunc, description, name }) => (
  <button onClick={() => clickFunc(name)}>
    {description}
    </button>
)


export default Button