const Total = ({parts}) => (
  <p>
    Total of &nbsp; 
    {parts.reduce(
      (accumulator, curr) => accumulator + curr.exercises, 0
       // Provide an initial value of 0
    )}&nbsp; exercises
  </p>
)
export default Total;