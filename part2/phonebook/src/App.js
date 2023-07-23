import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm.js";
import { Persons } from "./components/Persons";
const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filterVal, setFilterVal] = useState('');

  const handleNameChange = (event) => setName(event.target.value);

  const handleNumberChange = (event) => setNumber(event.target.value);

  const handleFiltering = function (event) {
    // console.log()
    const valueToFilter = event.target.value 
   setFilterVal(valueToFilter)

  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !number) return;
    for (let contact of contacts) {
      console.log("name", name);
      console.log("contact", contact);
      if (name === contact.name) {
        alert(`${name} is already added to numberbook`);
        return;
      }

      if (number === contact.number) {
        console.log("number", number);
        alert(`${number} is already added to numberbook`)
        return;
      }
    }
    // if (name in contacts) {
    //   event.preventDefault();
    //   console.log(name);
    //   setName('');
    //   setnumber('');
    //   alert(`${name} is already added to numberbook`);
    //   return;
    // } 
    setContacts([...contacts, { name: name, number: number }]);
    setName('');
    setNumber('');

  }
  return (
    <>
      <h2>numberbook</h2>
      {'search names'} <Filter filterVal={filterVal} handleFiltering={handleFiltering}/>
      <h2>Add a new number</h2>
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} name={name} number={number}/>
      <h1>Numbers</h1>
      <Persons filterVal={filterVal} contacts={contacts}/>
    </>

  )
}

export default App;