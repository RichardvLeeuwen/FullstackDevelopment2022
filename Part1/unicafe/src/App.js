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

const StatisticsLine = ({type, amount}) => {
  return (
    <tr>
      <td>{type}</td>
      <td>{amount}</td>
    </tr>
  )
}

const TotalFeedback = ({good, neutral, bad}) => {
  const type = 'All feedback'
  return (
    <StatisticsLine type={type} amount={good+neutral+bad}/>
  )
}

const AverageFeedback = ({good, neutral, bad}) => { //good counts for 1, neutral for 0, bad for -1
  const total = good+neutral+bad
  const goodScore = good
  const neutralScore = neutral * 0
  const badScore = bad * -1
  const averageScore = (goodScore+neutralScore+badScore)/(total)
  const type = 'Average feedback'

  return (
    <StatisticsLine type={type} amount={averageScore}/>
  )
}

const PostiveFeedbackPercentage = ({good, neutral, bad}) => {
  const total = good+neutral+bad
  const positiveScore = (good/(total))*100
  const type = 'Positive feedback percentage'
  const amount = positiveScore + ' %'

  return (
    <StatisticsLine type={type} amount={amount}/>
  )
}

const Statistics = ({feedbackTypes, good, neutral, bad}) => {
  const statTitle = 'statistics'
  const total = good+neutral+bad

  if(total === 0) {
    return (
      <div>
        <Header header={statTitle}/>
        <p>No feedback has been given</p>
      </div>
    )
  }

  return (
    <div>
      <Header header={statTitle}/>
      <table>
        <tbody>
          <StatisticsLine type={feedbackTypes[0]} amount={good}/>
          <StatisticsLine type={feedbackTypes[1]} amount={neutral}/>
          <StatisticsLine type={feedbackTypes[2]} amount={bad}/>
          <TotalFeedback good={good} neutral={neutral} bad={bad}/>
          <AverageFeedback good={good} neutral={neutral} bad={bad}/>
          <PostiveFeedbackPercentage good={good} neutral={neutral} bad={bad}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const title = 'Please give unicafe feedback'
  const feedbackTypes = ['Good', 'Neutral', 'Bad']

  const incGood = () => setGood(good+1)
  const incNeutral = () => setNeutral(neutral+1)
  const incBad = () => setBad(bad+1)

  return (
    <div>
      <Header header={title}/>
      <Button clickFunc={incGood} description={feedbackTypes[0]}/>
      <Button clickFunc={incNeutral} description={feedbackTypes[1]}/>
      <Button clickFunc={incBad} description={feedbackTypes[2]}/>
      <Statistics feedbackTypes={feedbackTypes} good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
