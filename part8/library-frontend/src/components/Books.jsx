/* eslint-disable react/prop-types */


import { useState } from "react";
import { ALL_BOOKS } from "./queries";
import { useQuery } from '@apollo/client'


const Books = ({show}) => {
  const [selectedGenre, setSelectedGenre] = useState( null);

  const { data: booksData } = useQuery(ALL_BOOKS)

  const allGenres = Array.from(new Set(booksData.allBooks.flatMap((book) => book.genres)));
  
  const filteredBooks = selectedGenre
    ? booksData.allBooks.filter((book) => book.genres.includes(selectedGenre))
    : booksData.allBooks


  if (!show) {
    return null
  }


  return (
    <div>
      <h2>books</h2>
      {!selectedGenre ? null : <p>in genre <b>{selectedGenre}</b></p>}
      
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setSelectedGenre(null)}>All Genres</button>
        {allGenres.map((genre) => (
          <button key={genre} onClick={() => 
          {
          setSelectedGenre(genre)}}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books


