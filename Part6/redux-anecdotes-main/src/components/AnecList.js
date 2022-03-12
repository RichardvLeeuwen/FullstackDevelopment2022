import {useDispatch, useSelector} from 'react-redux'
import {upvote} from '../reducers/anecdoteReducer'

const AnecList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state =>  state.anecdotes)
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
                    <button onClick={() => dispatch(upvote(anecdote.id))}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecList