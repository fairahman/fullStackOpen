import { useState } from "react"

const  App = () => {
  
  const course = {
    name: 'Half Stack application development',
    parts: [ 
      { 
        name: 'Fundementals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
      name: 'State of a component',
      exercises: 14
      }
    ]
  }
  return (
    <>
      <Header course ={course} />      
      <Content content={course.parts} />
      <Total parts={course.parts} />
    </>
  );
}

const Header = ({ course }) => {
 return <h1>{course.name}</h1>
}

const Content = ({content}) => (  
  <>
   {content.map((obj, i) => <Part obj={obj} i={i+1}/>)} 
  </>
)  
  // <Part content={content}/>


const Part = ({obj, i}) => <p key={i}>{obj.name} {obj.exercises}</p>
  
const Total = ({parts}) => (
  <p>
    Number of exercises&nbsp;
    {parts.reduce(
      (accumulator, curr) => accumulator + curr.exercises, 0
       // Provide an initial value of 0
    )}
  </p>
)

export default App;
