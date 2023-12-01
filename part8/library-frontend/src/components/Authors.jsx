/* eslint-disable react/prop-types */

import { useMutation, useQuery  } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "./queries"
import { useState } from "react"
import Select from "react-select"

const Year = ({names}) => {
  

  // const [name, setName] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}],
    onError: (error) => {
        const messages = error.graphQLErrors.map(e =>e.message).join('\n')
        console.log(messages)
    }
  })

  const options = names.map((author) => ({
    value: author.name,
    label: author.name,
  }))


  const submit = (event) => {
    event.preventDefault()
    editAuthor({  variables: { name:selectedOption.value, setBornTo: parseInt(born) } })
    // setName('')
    setSelectedOption(null)
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          {/* name
          <input value={name}  onChange={({target}) => setName(target.value)}/>
         */}
         <Select value={selectedOption}
         onChange={(selectedOption) => setSelectedOption(selectedOption)}
         options={options}
         />
        </div>

        <div>
          born
          <input value={born} onChange={({target}) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>

  )
}

const Authors = ({show}) => {
  const result = useQuery(ALL_AUTHORS)
const authors = result.data.allAuthors
  if (result.loading) {
    return <div>loading...</div>
  }

  if (!show) {
    return null
  }
  // const authors = []

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Year names={authors} />
    </div>
  )
}

export default Authors
