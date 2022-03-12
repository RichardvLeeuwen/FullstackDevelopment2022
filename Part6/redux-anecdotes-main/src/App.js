import AnecList from './components/AnecList'
import AnecForm from './components/AnecForm'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <AnecList/>
      <h2>create new</h2>
      <AnecForm/>
    </div>
  )
}

export default App