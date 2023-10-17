import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import noteReducer from "./reducers/noteReducer"
import {createNote, toggleImportanceOf} from "./reducers/noteReducer"
import { useSelector, useDispatch } from 'react-redux'
import NewNote from './components/NewNote'
import Note from './components/Note'

// const store = createStore(noteReducer)

// store.dispatch({
//   type: "NEW_NOTE",
//   payload : {
//     content: "the app state is in redux store",
//     important: true,
//     id:1
//   }
// })

// store.dispatch({
//   type: 'NEW_NOTE',
//   payload: {
//     content: 'state changes are made with actions',
//     important: false,
//     id: 2
//   }
// })

// const generateId = () => Number((Math.random() * 1000000).toFixed(0))
// const createNote = (content) => {
//   return {
//     type: 'NEW_NOTE',
//     payload: {
//       content,
//       important: false,
//       id: generateId()
//     }
//   }
// }

// const toggleImportanceOf = (id) => {
//   return {
//     type: 'TOGGLE_IMPORTANCE',
//     payload: { id }
//   }
// }



const App = () => {
  
  return (
    <div>
      <NewNote />
      <Note />
    </div>
  )
}

// const root = ReactDOM.createRoot(document.getElementById('root'))

// const renderApp = () => {
//   root.render(<App />)
// }

// renderApp()
// store.subscribe(renderApp)
export default App