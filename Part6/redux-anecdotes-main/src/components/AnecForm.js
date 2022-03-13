import {newAnec} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notiReducer'
import { connect } from 'react-redux'

const AnecForm = (props) => {
    
    const newAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.newAnec(anecdote)
        props.setNotification(`You created the note ${anecdote}`, 5)
    }
    return (
        <div>
            <form onSubmit={newAnecdote}>
                <input name="anecdote"/>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    newAnec,
    setNotification
  }

const ConnectedAnecForm= connect(null, mapDispatchToProps)(AnecForm)
export default ConnectedAnecForm