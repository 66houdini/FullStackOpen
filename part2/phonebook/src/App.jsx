import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons"
 
const Notification = ({ message, err }) => {
  const className = err === false ? "message" : "error"
  if (message === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

  const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState(null)
    const [err, setErr] = useState(false);


    useEffect(() => {
      personService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
    }, [])

    const addPerson = (event) => {
      event.preventDefault();
      const nameExists = persons.some((person) => person.name === newName);
      const id = persons.find((n) => n.name === newName)?.id;
      const pObject = {
        name: newName,
        number: newNumber,
      };
      if (nameExists) {

        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const person = persons.find((n) => n.id === id);
          const changedPerson = { ...person, number: newNumber };
          personService
          .update(id, changedPerson).then( returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setMessage(`Updated ${returnedPerson.name}`)
          })
          .catch (() => {
            setErr(true)
            setMessage(`Information of  '${person.name}' has already been removed from server`)
            setPersons(persons.filter(n => n.id !== id))
          })
          setNewName('')
          setNewNumber('') 
        } else {
          return;
        }
        
      } else {
        setErr(false)
         personService
      .create(pObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${returnedPerson.name}`)
      })
      }
      
    };


    const handlePersonChange = (event) => {
      setNewName(event.target.value);
    };
    const handleNumberChange = (event) => {
      setNewNumber(event.target.value);
    };

    const handleSearch =(event) => {
     
      setSearch(event.target.value);
     
    }
    const filtered = persons.filter(person => person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    
    const deletePost = (id) => {
      const person = persons.find((n) => n.id === id);
      if (window.confirm(`Delete ${person.name}?`)) {
        personService
      .deleteFunction(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error =>{ throw error})
      } else {
        return;
      }
      
    }

    return (
      <div>
        <h2>Phonebook</h2>
        <Notification message={message} err={err} />
        <Filter search={search} handleClick={handleSearch} />
        <h3>add a new</h3>
        <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange}   />
        
        <h3>Numbers</h3>
        <Persons persons={filtered} delFunc={deletePost} />
        
      </div>
    );
  };

  export default App;
