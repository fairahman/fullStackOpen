import axios from "axios";
const getAll = () => {
  return axios.get('http://localhost:3001/persons')
    .then(response => response.data);
}
const create = ({capitalizedName: name, setName, number, setNumber, setContacts, contacts}) => {
   return axios.post('http://localhost:3001/persons', {name, number});     
}
const deleteContact = (url) => {
  return axios.delete(url)
      
}
const updateContact = (contact, number) => {
//   const res = await axios.put('/api/article/123', {
//     title: 'Making PUT Requests with Axios',
//     status: 'published'
// });
const url = `http://localhost:3001/persons/${contact.id}`;
  console.log("contact at updateContact():", contact)
  console.log("number at updateContact():", number)
  return axios.put(url, {...contact, number})
    // .then(response => console.log("response from updateContact():", response))
    // .catch(err => console.log("error at updating in updateContact:", err))
}
const noteService = {create, getAll, deleteContact, updateContact}
export default noteService;