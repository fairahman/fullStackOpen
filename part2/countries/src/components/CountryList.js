const { v4: uuidv4 } = require('uuid');
export const CountryList = ({searchedCountries, showCountry, setTargetCountry, setSearchedCountries}) => {
   
  return (
  typeof searchedCountries === 'string' ? 
    <div> {searchedCountries} </div> :
    <div>
      {searchedCountries.map(country => <li key ={uuidv4()}>{country} <button onClick={() => showCountry(country, setTargetCountry, setSearchedCountries)}>show</button></li> )}
    </div> 
  )
}
