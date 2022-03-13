import {useDispatch, useSelector} from 'react-redux'
import {upvote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notiReducer'

const AnecList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state =>  {
        const anec = state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter.text))
        return anec
    })
    const toSortAnecdotes = [...anecdotes]
    const sortedAnecdotes = toSortAnecdotes.sort((a,b) => b.votes - a.votes)

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => { 
                        dispatch(setNotification(`Upvoted!`, 5))
                        dispatch(upvote(anecdote.id))
                        }}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecList