import { useState } from "react";
const ShowStats = ({good, neutral, bad, all, avg, positive}) => {

  return (<>
     <h1>statistics</h1>    
      <Display reviewCategory={'good'} reviewCount={good}/>
      <Display reviewCategory={'neutral'} reviewCount={neutral}/>
      <Display reviewCategory={'bad'} reviewCount={bad}/>
      <Display reviewCategory={'all'} reviewCount={all}/>
      <Display reviewCategory={'avg'} reviewCount={avg}/>
      <Display reviewCategory={'positive'} reviewCount={positive}/> 
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
  // const calcAvgScore = () => 
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
const Display = ({reviewCategory, reviewCount}) => <p>{reviewCategory} {reviewCount}</p>
export default App;
