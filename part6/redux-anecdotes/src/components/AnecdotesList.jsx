import { useDispatch, useSelector } from "react-redux";
import {voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, clearNotification } from "../reducers/notificationReducer";

const AnecdotesList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({anecdotes, filter}) => {
    
    if (filter === "" || filter === null) {
      return anecdotes;
    }

    const filteredAnecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredAnecdotes.sort((a, b) => b.votes - a.votes);

    
  })

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`Voted for: ${anecdote.content}`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000)
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdotesList;
