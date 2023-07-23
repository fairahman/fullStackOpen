import { useState } from "react";
const App = () => {
  const [contacts, setContacts] = useState({});
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleNameChange = (event) => setName(event.target.value);
    

  const handlePhoneChange = (event) => setPhone(event.target.value);
  
  const handleSubmit = (event) => {
    if (name in contacts) {
      event.preventDefault();
      console.log(name);
      setName('');
      setPhone('');
      alert(`${name} is already added to phonebook`);
      return;
    }
    event.preventDefault();
    setContacts({...contacts, [name]: phone});
    setName('');
    setPhone('');

  }
  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        name <input value={name} onChange={handleNameChange} />
        phone <input value={phone} onChange={handlePhoneChange} />
        <button>
          submit
        </button>
      </form>
      <h1>Numbers</h1>
      <div>
        {Object.entries(contacts).map(([key, value]) => <div key={key}>{key} {value}</div>)}
      </div>
      
    </>

  )
}

export default App;
