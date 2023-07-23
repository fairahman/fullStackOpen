import { useState } from "react";
import Filter from "./components/Filter";
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
    console.log("contacts", contacts);

    event.preventDefault();
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
      {'filter shown with'} <Filter filterVal={filterVal} handleFiltering={handleFiltering}/>
      <h2>Add a new number</h2>
      <form onSubmit={handleSubmit}>
        name <input value={name} onChange={handleNameChange} />
        number <input value={number} onChange={handleNumberChange} />
        <button>
          add
        </button>
      </form>
      <h1>Numbers</h1>
      <div>
        {filterVal ? contacts.filter(contact => {
            for (let i = 0; i < filterVal.length; i++) {
              if (filterVal[i].toLowerCase() !== contact.name[i].toLowerCase()) {
                return false;
              } 
            }  
            return true; 
          }).map(contact => (<div key={contact.name}>{contact.name} {contact.number}</div>)) : 
        contacts.map((contact) => <div key={contact.name}> {contact.name} {contact.number} </div>)}
      </div>
      
    </>

  )
}

export default App;
