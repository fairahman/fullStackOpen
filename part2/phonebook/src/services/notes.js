import axios from "axios";
const getAll = () => {
  return axios.get('http://localhost:3001/persons')
    .then(response => response.data);
}
const create = ({name, setName, number, setNumber, setContacts, contacts}) => {
   return axios.post('http://localhost:3001/persons', {name, number});     
}
const deleteContact = (url) => {
  return axios.delete(url)
      
}
export default {create, getAll, deleteContact};