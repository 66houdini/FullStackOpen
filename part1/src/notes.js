/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */


class Person{
  constructor(name, age){
    this.name = name
    this.age = age
  }
  greet(){
    console.log(`Hello, my name is ${this.name}`)
  }
}

const adam = new Person('Adam Ondra', 35)
adam.greet()

const janja = new Person('Janja Garnbret', 22)
janja.greet()

// const bornYear = () => new Date().getFullYear() - age

// const bornYear = () => {
//   return new Date().getFullYear() - age
// }

const Header = (props) => {
  return <>{props.course}</>;
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.parts.name} {props.parts.exercises}
      </p>
    </>
  );
};
const Content = (props) => {
  return (
    <>
      <Part parts={props.parts[0]}/>
      <Part parts={props.parts[1]} />
      <Part parts={props.parts[2]}  />
    </>
  );
};

const Total = (props) => {
  let total = 0;
  props.parts.map((part) => {
    total+=part.exercises;
  })
  return (
    <>
      Number of exercises {total}
    </>
  );
};

const App = (props) => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
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
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  );
};

export default App;
