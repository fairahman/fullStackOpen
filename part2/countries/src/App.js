import axios from "axios"
import { useEffect, useState } from "react";
import { CountryList } from "./components/CountryList";
import countries from "./services/countries"
import CountryInfo from "./components/CountryInfo";


const App = () => { 
  console.log("process",process.env.REACT_APP_API_KEY)
  const [targetCountry, setTargetCountry] = useState('')
  const [allCountries, setAllCountries] = useState('');
  const [searchedCountries, setSearchedCountries] = useState([]);
  
  
  const handleCountryChange = (event) => {
    // console.log("value",event.target.value)
    const inputVal = event.target.value;
    // console.log("allCountries", allCountries)
    
      let filteredCountries = [];
      for(let i = 0; i < allCountries.length; i++) {
        
        if (filteredCountries.length > 10) {
          setSearchedCountries('too many matches, be more specific...');
          return;
        }
        let j = 0
        while (j < inputVal.length) {
          console.log('line27',allCountries[i][j].toLowerCase(), inputVal[j] )
          if (allCountries[i][j].toLowerCase() !== inputVal[j].toLowerCase()) break;
          if (j  === inputVal.length - 1) filteredCountries.push(allCountries[i])
          j++;
        }        
      }
      if (filteredCountries.length === 1) {
        setSearchedCountries([]);
        countries
          .showCountry(filteredCountries[0], setTargetCountry)
          // .getCountry(filteredCountries[0])
          // .then((response) => setTargetCountry(response) )
        
      }
        //lates test with removing the else statement to see what happnes in the UI:
        //hypothesis: UI will show both the list of countries and the info of the one selected country
      else {
        setTargetCountry(null)
        setSearchedCountries(filteredCountries);
      }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      let countriesArr = response.data;
      setAllCountries(countriesArr.map((country) => country.name.common))
    }
    fetchData()
  },[])

  return (
    <div> 
     find countries<input  type="text" onChange={handleCountryChange}/>
     <div>
     <CountryList searchedCountries={searchedCountries} setSearchedCountries={setSearchedCountries} setTargetCountry={setTargetCountry} showCountry={countries.showCountry}/>
     <CountryInfo targetCountry ={targetCountry}/>
     </div>   
    </div>
  )
// value ={userInput}
};

export default App;
 