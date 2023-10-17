import AnecdoteForm from './components/NewAnecdotes'
import AnecdotesList from './components/AnecdotesList'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App