import {createSlice} from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"


const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: { 
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      
      const updatedState =  state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
      return updatedState.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdotes(state, action) {
      state.push(...action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const {vote, appendAnecdotes, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
    dispatch(vote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer