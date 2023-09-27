const Persons =({persons, delFunc}) => {
    return (
      <>
      {persons.map((person) => (
          <p key={person.name}>
            {person.name} {person.number} 
            <button onClick={() => delFunc(person.id)}>delete</button>
          </p>
          
        ))} 
      </>
    )
  }

export default Persons;