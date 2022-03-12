import {useDispatch} from 'react-redux'
import {newAnec} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notiReducer'

const AnecForm = () => {
    const dispatch = useDispatch()
    
    const newAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(newAnec(anecdote))
        dispatch(setNotification(`You created the note ${anecdote}`, 5))
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

export default AnecForm