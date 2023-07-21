import { useState } from "react";
const ShowStats = ({good, neutral, bad, all, avg, positive}) => {

  return (
    <>
      <h1>statistics</h1>
      {good || neutral || bad ? (
        <table>
          <tbody>
            <StatisticLine reviewCategory={'good'} reviewCount={good}/>
            <StatisticLine reviewCategory={'neutral'} reviewCount={neutral}/>
            <StatisticLine reviewCategory={'bad'} reviewCount={bad}/>
            <StatisticLine reviewCategory={'all'} reviewCount={all}/>
            <StatisticLine reviewCategory={'avg'} reviewCount={avg}/>
            <StatisticLine reviewCategory={'positive'} reviewCount={positive}/> 
          </tbody>   
        </table>
      ) : 'No feedback given'}    
    </>)
}
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [avg, setAvg] = useState(0);
  const [positive, setPositive] = useState('0%');
  
  
  const handleClick = (reviewCategory) => {
    if (reviewCategory === 'good') {
      return () => {
      const updatedGood = good + 1;
      setGood(updatedGood);
      const totalReviews = all + 1;
      setAll(totalReviews);
      const totalScore = updatedGood + (-1 * bad);
      setAvg(totalScore/totalReviews);
      setPositive(`${(updatedGood/totalReviews)*100}%`)
      }
    }
    if (reviewCategory === 'neutral') {
      return () => {
      const updatedNeutral = neutral + 1;
      setNeutral(updatedNeutral);
      const totalReviews = all +  1;
      setAll(totalReviews);
      const totalScore = good + (-1 * bad);
      setAvg(totalScore/totalReviews);
      setPositive(`${(good/totalReviews)*100}%`)
      }
    }
    if (reviewCategory === 'bad') {
      return () => {
      const updatedBad = bad + 1;
      setBad(updatedBad);
      const totalReviews = all + 1;
      setAll(totalReviews);
      const totalScore = good + (-1 * updatedBad);
      setAvg(totalScore/ totalReviews);
      setPositive(`${(good/totalReviews)*100}%`);

      }
    }  
  } 
  
    return (
      
      <div>
        <h1>give feedback</h1>
        <Button handleClick={handleClick} review={'good'}/>
        <Button handleClick={handleClick} review={'neutral'}/>
        <Button handleClick={handleClick} review={'bad'}/>
        <ShowStats good={good} neutral={neutral} bad={bad} all ={all} avg={avg} positive={positive} />
        
      </div>
    );
  
  
}
// **Remember to add event handlers to the Button component**
const Button = ({review, handleClick}) => <button onClick={handleClick(review)}>{review}</button>  
const StatisticLine = ({reviewCategory, reviewCount}) => {

  return (<tr>
    <td>{reviewCategory}</td>
    <td>{reviewCount}</td>
  </tr>)
}
export default App;
