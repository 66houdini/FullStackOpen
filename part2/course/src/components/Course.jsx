const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Total = ({ exercises }) => {
  const total = exercises.reduce((acc, current) => acc + current);
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};

const Part = ({ text, exercises }) => {
  return (
    <div>
      <p>
        {text} {exercises}
      </p>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} text={part.name} exercises={part.exercises} />
      ))}
      <Total exercises={parts.map((part) => part.exercises)} />
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      {course.map((course) => (
        <div key={course.id}>
          <Header text={course.name} />
          <Content parts={course.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course;
