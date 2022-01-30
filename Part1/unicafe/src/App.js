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
  const statTitle = 'statistics'

  const incGood = () => setGood(good+1)
  const incNeutral = () => setNeutral(neutral+1)
  const incBad = () => setBad(bad+1)

  return (
    <div>
      <Header header={title}/>
      <Button clickFunc={incGood} description={"Good"}/>
      <Button clickFunc={incNeutral} description={"Neutral"}/>
      <Button clickFunc={incBad} description={"Bad"}/>
      <Header header={statTitle}/>
      <p>{'Good feedback total: '+ good}</p>
      <p>{'Neutral feedback total: '+ neutral}</p>
      <p>{'Bad feedback total: '+ bad}</p>
    </div>
  )
}

export default App
