import { useMemo } from "react";

export const Persons = ({filterVal, contacts, handleDelete}) => {
 // console.log("filterVal at Persons:", contacts)
 const cachedContacts = useMemo(() =>{
   return contacts.map((contact) => <div key={contact.name} id={contact.id}> {contact.name} {contact.number} <button onClick={handleDelete}>delete</button> </div>)
 }, [contacts, handleDelete]);
  return (
    <>
      {filterVal ? contacts.filter(contact => {
        for (let i = 0; i < filterVal.length; i++) {
          if (filterVal[i].toLowerCase() !== contact.name[i]?.toLowerCase()) {
            return false;
          } 
        }  
        return true;
      })
      .map(contact => <div key={contact.name} id ={contact.id}> {contact.name} {contact.number} <button onClick={handleDelete}>delete</button> </div>)  
      : cachedContacts}  
    </>
  )
}
