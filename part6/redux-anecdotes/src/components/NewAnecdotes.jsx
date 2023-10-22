import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { clearNotification, setNotification } from "../reducers/notificationReducer"

const NewAnecdote = () => {

    const dispatch = useDispatch()
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdotes.value
        event.target.anecdotes.value = ''
        dispatch(createAnecdote(content))

        dispatch(setNotification(`New anecdote: ${content}`))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      }
      return (
        <>
        <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdotes' /></div>
        <button type='submit'>create</button>
      </form>
        </>
      )
}

export default NewAnecdote