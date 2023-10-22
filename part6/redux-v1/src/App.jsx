// import { useEffect } from "react";
// import NewNote from "./components/NewNote";
// import Note from "./components/Note";
// import VisibilityFilter from "./components/VisibilityFilter";
// import { initializeNotes, setNotes } from "./reducers/noteReducer";
// import { useDispatch } from "react-redux";


// // const store = createStore(noteReducer)

// // store.dispatch({
// //   type: "NEW_NOTE",
// //   payload : {
// //     content: "the app state is in redux store",
// //     important: true,
// //     id:1
// //   }
// // })

// // store.dispatch({
// //   type: 'NEW_NOTE',
// //   payload: {
// //     content: 'state changes are made with actions',
// //     important: false,
// //     id: 2
// //   }
// // })

// // const generateId = () => Number((Math.random() * 1000000).toFixed(0))
// // const createNote = (content) => {
// //   return {
// //     type: 'NEW_NOTE',
// //     payload: {
// //       content,
// //       important: false,
// //       id: generateId()
// //     }
// //   }
// // }

// // const toggleImportanceOf = (id) => {
// //   return {
// //     type: 'TOGGLE_IMPORTANCE',
// //     payload: { id }
// //   }
// // }

// const App = () => {
//   const dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(initializeNotes())
//   }, [])
//   // useEffect(() => {
//   //   noteService
//   //   .getAll().then(notes => dispatch(setNotes(notes)))
//   // }, [])

//   return (
//     <div>
//       <NewNote />
//       <VisibilityFilter/>
//       <Note />
//     </div>
//   );
// };

// // const root = ReactDOM.createRoot(document.getElementById('root'))

// // const renderApp = () => {
// //   root.render(<App />)
// // }

// // renderApp()
// // store.subscribe(renderApp)
// export default App;


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {getNotes, createNote, updateNote} from "./requests.js"


const App = () => {

  const queryClient = useQueryClient()
  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData(["notes"])
      queryClient.setQueryData(["notes"], notes.concat(newNote))
    }
  })
  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["notes"]})
    }
  })
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({content, important: true})
  }

  

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({...note, important: !note.important})
  }

  const result = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes, 
    refetchOnWindowFocus: false
  })
  console.log(JSON.parse(JSON.stringify(result)))
  if (result.isLoading) {
    return <div>loading data...</div>
  }


  const notes = result.data

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App