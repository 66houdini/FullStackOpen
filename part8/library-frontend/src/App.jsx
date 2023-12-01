/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, } from './components/queries'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

const Notify = ({errorMessage}) => {
  if (!errorMessage){
    return null
  }
  return (
    <div style={{color: "red"}}>
      {errorMessage}
    </div>
  )
}


export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}




const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const result = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  const client = useApolloClient()
  
  useSubscription(BOOK_ADDED, {
    onData: ({data}) => {
      console.log(data)
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCache(client.cache, {query: ALL_BOOKS}, addedBook)
    }
  })

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("library-user-token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, [])

  if (result.loading || books.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleLoginSuccess = () => {
    setPage((currentPage) => (currentPage === 'login' ? 'authors' : currentPage));

  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()

  }

  return (

    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? (
          <>
            <button onClick={() => setPage('login')}>login</button>
          </>
        ) : (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>
          <Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} />
      <Books  show={page === 'books'} />
      <Recommended show={page === "recommend"} />
      <NewBook show={page === "add"}  setError={notify} />
      <LoginForm show={page === "login"} setError={notify}  setToken={setToken} onLoginSuccess={handleLoginSuccess} />

    </div>
  )
}

export default App
