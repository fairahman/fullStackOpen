const Total = ({parts}) => (
  <strong><p>
   Total of&nbsp; 
    {parts.reduce(
      (accumulator, curr) => accumulator + curr.exercises, 0
       // Provide an initial value of 0
    )}&nbsp;exercises 
  </p>
  </strong>
)
export default Total;