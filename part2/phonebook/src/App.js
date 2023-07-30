import { useEffect, useState } from "react";
import noteService from "./services/notes.js";
import Notification from "./components/Notification.js";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm.js";
import { Persons } from "./components/Persons";

const App = () => {

  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filterVal, setFilterVal] = useState('');
  const [message, setMessage] = useState(null)
  console.log("name", name)
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !number) setMessage(`missing ${name ? name : number}!`); // if submitted without entering either name or number
    const updatedContacts = [];
    let isContactUpdated = false;

    // console.log("name at handleSubmit", name.split(' '))
    const capitalizedName = name.split(' ')
      .map((word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
      .join(' ')
    console.log("capitalName:", capitalizedName)

    for (let contact of contacts) {
      console.log("name1", name);
      console.log("contact1", contact);
      // gotta remember to compare with  lowercase
      if (capitalizedName === contact.name) {
        // alert(`${name} is already added to numberbook`);
        const replace = window.confirm(`${capitalizedName} is already added to phonebook, replace old number with new one?`)
        //** */ YOU WERE CODING HERE TRYING TO SEND ID OF DUPLICATE NAMED CONTACT TO THE isContactUpdated FUNCTION
        if (replace) {
          try {
            console.log('hello')
            const newContact = await noteService.updateContact(contact, number);
            
            updatedContacts.push(newContact.data);
            isContactUpdated = true;
            setName('');
            setNumber('');
            setMessage('contact updated successfully!');
            setTimeout(() => setMessage(null), 5000);
            console.log("isContactUpdated at line 63", isContactUpdated)
          }
          catch(error) {
            console.log(error);
            setContacts(contacts.filter((contact) => contact.name !== capitalizedName));
            setMessage(`Information of ${capitalizedName} has already been removed from server`);
            setTimeout(() => setMessage(null), 5000);
            return;
          }


          //  WILL HAVE TO DO IT AFTER CONSIDERING ASYNCHRONOSITY!!! setContacts(updatedContacts);

          // const contacts.filter(contact => contact.name !== name)

        }
        else return;
      }

      else if (number === contact.number) {
        console.log("number", number);
        alert(`${number} is already added to numberbook`)
        return
      }
      else updatedContacts.push(contact);
    }
    // if (name in contacts) {
    //   event.preventDefault();
    //   console.log(name);
    //   setName('');
    //   setnumber('');
    //   alert(`${name} is already added to numberbook`);
    //   return;
    // }
    console.log("full updatedContacts:", updatedContacts);
    if (!isContactUpdated) {
      // console.log('here is the problemmm!!!!!!!!!!!!! at line 88', isContactUpdated)
      noteService
        .create({ capitalizedName, setName, number, setNumber, contacts, setContacts })
        .then(response => {setContacts(contacts.concat(response.data))
          setName('');
          setNumber('');
          setMessage('contact created successfully!');
          setTimeout(() => setMessage(null), 5000);
        })
        .catch((err) => {
          console.log("error:", err)
          setMessage('error creating contact!');
          setTimeout(() => setMessage(null), 5000);
        })
    
        
    }
    else setContacts(updatedContacts);

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
        const updatedContacts = contacts.filter((contact) => contact.id !== +id);
        console.log("updatedContacts", updatedContacts);
        setContacts(updatedContacts);
        setMessage('contact deleted successfully!');
        setTimeout(() => setMessage(null), 5000);
      })
      .catch((err) => {
        console.log(err)
        setMessage(`information of ${contactToDel.name} has already been removed from server`);
        setTimeout(() => setMessage(null), 5000);
        setContacts(contacts.filter((contact) => contact.id !== +id));
      })
  }
  return (
    <>
      <h2>numberbook</h2>
      <Notification message={message} />
      {'search names'} <Filter filterVal={filterVal} handleFiltering={handleFiltering} />
      <h2>Add a new number</h2>
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} name={name} number={number} />
      <h1>Numbers</h1>
      <Persons filterVal={filterVal} contacts={contacts} handleDelete={handleDelete} />
    </>

  )
}

export default App;
