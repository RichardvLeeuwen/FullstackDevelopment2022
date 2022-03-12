import {useDispatch} from 'react-redux'
import {newAnec} from '../reducers/anecdoteReducer'
import {setNoti, removeNoti} from '../reducers/notiReducer'
import anecService from '../services/anecdotes'

const AnecForm = () => {
    const dispatch = useDispatch()
    
    const newAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecd = await anecService.createNew(anecdote)
        dispatch(newAnec(newAnecd))
        dispatch(setNoti(`You created the note ${anecdote}`))
        setTimeout(() => {
            dispatch(removeNoti())
        }, 5000)
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