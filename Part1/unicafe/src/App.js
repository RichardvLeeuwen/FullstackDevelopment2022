import { useState } from 'react'

const Header = ({header}) => {
  return (
    <div>
      <h1>{header}</h1>
    </div>
  )
}

const Button = ({ clickFunc, description }) => (  //similar to as shown in the tutorial about rendering in part 1
  <button onClick={clickFunc}>
    {description}
    </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const title = 'Please give unicafe feedback'
  return (
    <div>
      <Header header={title}/>
      <Button clickFunc={()=>console.log('test')} description={"good"}/>
      <Button clickFunc={()=>console.log('test1')} description={"neutral"}/>
      <Button clickFunc={()=>console.log('test2')} description={"bad"}/>
    </div>
  )
}

export default App
