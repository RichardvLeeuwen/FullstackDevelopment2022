import AnecList from './components/AnecList'
import AnecForm from './components/AnecForm'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecList/>
      <h2>create new</h2>
      <AnecForm/>
    </div>
  )
}

export default App