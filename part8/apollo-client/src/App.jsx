/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {useApolloClient, useQuery, useSubscription } from "@apollo/client"
import { useState } from "react"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import { ALL_PERSONS, PERSON_ADDED } from "./components/queries"
import PhoneForm from "./components/PhoneForm"
import LoginForm from "./components/LoginForm"


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

/* function that takes care of manipulating cache */
export const updateCache = (cache, query, addedPerson)  => {

  const uniqByName = (a) => {
    let seen =  new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({allPersons}) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    }
  })
}


const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client  = useApolloClient()

  useSubscription(PERSON_ADDED, {
    onData: ({data}) => {
      const addedPerson = data.data.personAdded
      notify(`${addedPerson.name} added`)
      updateCache(client.cache, {query: ALL_PERSONS}, addedPerson)

    }
  })

  if (result.loading) {
    return <div>loading...</div>
  }
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage}/>
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify}/>
      </div>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage}/>
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify}/>
      <PhoneForm setError={notify}/>
    </div>
  )
}

export default App
