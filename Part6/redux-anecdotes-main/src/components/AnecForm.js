import {useDispatch} from 'react-redux'
import {newAnec} from '../reducers/anecdoteReducer'

const AnecForm = () => {
    const dispatch = useDispatch()
    
    const newAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(newAnec(anecdote))
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