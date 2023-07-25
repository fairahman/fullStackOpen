import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm.js";
import { Persons } from "./components/Persons";
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filterVal, setFilterVal] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setContacts(response.data));
  }, [])

  console.log("contacts", contacts);

  const handleNameChange = (event) => setName(event.target.value);

  const handleNumberChange = (event) => setNumber(event.target.value);

  const handleFiltering = function (event) {
    // console.log()
    const valueToFilter = event.target.value 
   setFilterVal(valueToFilter)

  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !number) return; // if submitted without entering either name or number
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
    axios
      .post(' http://localhost:3001/persons', {name, number})
      .then(response => setContacts(contacts.concat(response.data)));
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
