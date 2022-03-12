import AnecList from './components/AnecList'
import AnecForm from './components/AnecForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecList/>
      <h2>create new</h2>
      <AnecForm/>
    </div>
  )
}

export default App