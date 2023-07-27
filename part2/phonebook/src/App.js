import { useEffect, useState } from "react";
 import noteService from "./services/notes.js" ;

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm.js";
import { Persons } from "./components/Persons";

const App = () => {
  console.log(noteService)
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filterVal, setFilterVal] = useState('');

  useEffect(() => {
    console.log('useEffect runs...')
    const fetchData = async () => {
      const response = await noteService.getAll();
      console.log("response of async at useEffect:", response);
      setContacts(response); // Update the state with fetched data directly
    };
  
    fetchData(); // Call the async function to fetch and update the state
  }, []);
  
  console.log("contacts", contacts);

  const handleNameChange = (event) => setName(event.target.value)

  const handleNumberChange = (event) => setNumber(event.target.value);

  const handleFiltering = function (event) {
    // console.log()
    const valueToFilter = event.target.value 
   setFilterVal(valueToFilter)
   //experimenting using useMemo()


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
        return
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
    noteService
      .create({name, setName, number, setNumber, contacts, setContacts})
      .then(response => setContacts(contacts.concat(response.data)));
      setName('');
      setNumber('');
    // axios
    //   .post(' http://localhost:3001/persons', {name, number})
    //   .then(response => setContacts(contacts.concat(response.data)));
    //   setName('');
    //   setNumber('');

  }
  const handleDelete = (event) => {
  
   const id = event.target.parentElement.getAttribute('id');
   const contactToDel = contacts.find(contact => contact.id === +id);
   if (!window.confirm(`delete ${contactToDel.name}?`)) {
    return;
   }   
   const url = `http://localhost:3001/persons/${id}`
   noteService
    .deleteContact(url)
    .then(() => {
      
      const updatedContacts = contacts.filter((contact) => {
        // if (contact.id === +id) deleteName = contact.name; 
        return contact.id !== +id})
      console.log("updatedContacts", updatedContacts);
      setContacts(updatedContacts);  
    })

  }
  return (
    <>
      <h2>numberbook</h2>
      {'search names'} <Filter filterVal={filterVal} handleFiltering={handleFiltering}/>
      <h2>Add a new number</h2>
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} name={name} number={number}/>
      <h1>Numbers</h1>
      <Persons filterVal={filterVal} contacts={contacts} handleDelete={handleDelete}/>
    </>

  )
}

export default App;
