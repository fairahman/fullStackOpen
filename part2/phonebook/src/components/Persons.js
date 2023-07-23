export const Persons = ({filterVal, contacts}) => {
  return (
    <>
      {filterVal ? contacts.filter(contact => {
        for (let i = 0; i < filterVal.length; i++) {
          if (filterVal[i].toLowerCase() !== contact.name[i].toLowerCase()) {
            return false;
          } 
        }  
        return true; 
      })
      .map(contact => 
        (<div key={contact.name}>{contact.name} {contact.number}</div>)) : 
      contacts.map((contact) => <div key={contact.name}> {contact.name} {contact.number} </div>)}  
    </>
  )
}
