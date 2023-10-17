import { useDispatch } from "react-redux"
import { newInput } from "../reducers/anecdoteReducer"

const NewAnecdote = () => {

    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdotes.value
        event.target.anecdotes.value = ''
        dispatch(newInput(content))
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