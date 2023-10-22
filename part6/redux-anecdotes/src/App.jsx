import AnecdoteForm from './components/NewAnecdotes'
import AnecdotesList from './components/AnecdotesList'
import Filter from './components/FilteredList'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { initializeAnecdotes} from './reducers/anecdoteReducer'
import { useDispatch} from "react-redux"



const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])



  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <Notification/>
      <AnecdotesList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App