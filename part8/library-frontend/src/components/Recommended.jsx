/* eslint-disable react/prop-types */


import { useState, useEffect } from "react";
import { ALL_BOOKS, ME } from "./queries";
import { useQuery  } from '@apollo/client'



const Recommended = ({show}) => {
    const [selectedGenre, setSelectedGenre] = useState(null)
    const {loading: loadingMe, data:meData} = useQuery(ME)

    const {data:booksData, loading: loadingBooks} = useQuery(ALL_BOOKS)
        // const {data:booksData, loading: loadingBooks} = useQuery(ALL_BOOKS, {
        //     variables: {genre: selectedGenre}})


    useEffect(() => {
        if(meData){
            setSelectedGenre(meData?.me?.favoriteGenre)
        }
    }, [meData])


    const filteredBooks = selectedGenre
    ? booksData.allBooks.filter((book) => book.genres.includes(selectedGenre))
    : booksData.allBooks

    if (!show) {
        return null
    }

    if (loadingMe || loadingBooks) {
        return <div>loading...</div>
    }

    return (
        <div>
          <h2>Recommendations</h2>
          <p>books in your favorite genre <b>{meData.me.favoriteGenre}</b></p>
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
        </div>
    )

}
export default Recommended