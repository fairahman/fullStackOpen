import Course from "./components/Course";
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
      },
      {
      name: 'Redux',
      exercises: 11
      }
    ]
  }
  return (
    <>
      {/* <Header course ={course} />      
      <Content content={course.parts} />
      <Total parts={course.parts} /> */}
      <Course course={course}/>
    </>
  );
} 

export default App;
