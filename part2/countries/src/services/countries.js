import axios from "axios"

  const showCountry = async (country, setTargetCountry) => {
    try {
      const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      console.log("Response", response.data)
      setTargetCountry(response.data);
      // setSearchedCountries([]);
    }
    catch(err) {
      console.log("error at getting country info", err);
    }

  }
const countries = {showCountry}
export default countries;