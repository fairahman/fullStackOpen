const { v4: uuidv4 } = require('uuid');
const CountryInfo = ({targetCountry}) => {
  console.log("at countryInfo", targetCountry)
  return (
    <>{ targetCountry ? 
      (<div>
        <h1>{targetCountry.name?.common}</h1>
        <p>capital {targetCountry.capital?.[0]}<br/>
        Area {targetCountry.area} <br/>
        </p>
        <h3>Languages:</h3> 
        <div className="langList">{Object.values(targetCountry.languages).map((lang) => <li key={uuidv4()}>{lang}</li>)}</div>
        <img id ='flag' alt="country's flag" src={targetCountry.flags.svg}></img>
      </div>) : <></>
    }
    
    </>
  )
}

export default CountryInfo