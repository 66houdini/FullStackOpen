import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux"
import App from './App'
import { createStore } from 'redux'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
  )



// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { createStore } from 'redux'


// const noteReducer = (state = [], action) => {
//   if (action.type === "NEW_NOTE") {
//     return state.concat(action.payload)
//   }
//   return state
// }

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



// const App = () => {
//   return (
//     <div>
//       <ul>
//       {store.getState().map(note=>
//           <li key={note.id}>
//             {note.content} <strong>{note.important ? 'important' : ''}</strong>
//           </li>
//         )}
//       </ul>
//     </div>
//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('root'))

// const renderApp = () => {
//   root.render(<App />)
// }

// renderApp()
// store.subscribe(renderApp)


// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )


// import React from 'react'
// import ReactDOM from 'react-dom/client'

// import { createStore } from 'redux'

// const counterReducer = (state = 0, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1
//     case 'DECREMENT':
//       return state - 1
//     case 'ZERO':
//       return 0
//     default:
//       return state
//   }
// }
// const noteReducer = (state = [], action) => {
//   if (action.type === "NEW NOTE") {
//     state.push(action.payload)
//     return state
//   }
//   return state
// }
// const store = createStore(counterReducer)

// const App = () => {
//   return (
//     <div>
//       <div>
//         {store.getState()}
//       </div>
//       <button 
//         onClick={e => store.dispatch({ type: 'INCREMENT' })}
//       >
//         plus
//       </button>
//       <button
//         onClick={e => store.dispatch({ type: 'DECREMENT' })}
//       >
//         minus
//       </button>
//       <button 
//         onClick={e => store.dispatch({ type: 'ZERO' })}
//       >
//         zero
//       </button>
//     </div>
//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('root'))

// const renderApp = () => {
//   root.render(<App />)
// }

// renderApp()
// store.subscribe(renderApp)