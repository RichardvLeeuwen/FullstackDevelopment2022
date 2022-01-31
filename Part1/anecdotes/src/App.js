import { useState } from 'react'

const Button = ({ clickFunc, description }) => (  //similar to as shown in the tutorial about rendering in part 1
  <button onClick={clickFunc}>
    {description}
    </button>
)

const Header = ({header}) => {
  return (
    <div>
      <h1>{header}</h1>
    </div>
  )
}

const DisplayVotes = ({votes, selected}) => {
  return (
    <p>Total votes: {votes[selected]}</p>
  )
}

const DisplayAnecdote = ({anecdotes, selected}) => {
  return (
    <p>{anecdotes[selected]}</p>
  )
}

const AnecMostVotes = ({votes, anecdotes}) => {
  const header = 'Anecdote with most votes'
  const highestVotes = Math.max(...votes) //find highest vote count in votes array
  const anecIndex = votes.indexOf(highestVotes) //find corresponding index of anecdote

  return (
    <div>
      <Header header={header}/>
      <DisplayAnecdote anecdotes={anecdotes} selected={anecIndex}/>
      <DisplayVotes votes={votes} selected={anecIndex}/>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0))

  const nextAnec = 'Next anecdote'
  const voteText = 'Upvote'
  const anecHeader = 'Anecdote of the day'

  const selectRandomAnecdote = () => {
    let nextAnecdoteNum = Math.floor(Math.random() * anecdotes.length)
    while(nextAnecdoteNum === selected) { //to prevent the same anecdote from being selected twice in a row
      nextAnecdoteNum = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(nextAnecdoteNum)
  }

  const upvote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVote(votesCopy)
  }

  return (
    <div>
      <Header header={anecHeader}/>
      <DisplayAnecdote anecdotes={anecdotes} selected={selected}/>
      <DisplayVotes votes={votes} selected={selected}/>
      <Button clickFunc={selectRandomAnecdote} description={nextAnec}/>
      <Button clickFunc={upvote} description={voteText}/>
      <AnecMostVotes votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App
