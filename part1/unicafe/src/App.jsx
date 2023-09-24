/* eslint-disable no-unused-vars */
import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, stats }) => {

    return (
      <tr>
        <td>{text} </td>
        <td>{stats}</td>
      </tr>
    );

};

const Statistics = ({ good, bad, neutral }) => {
  let total = good + bad + neutral;
  let average = (good * 1 + neutral * 0 + bad * -1) / total;
  let positive = (good / total) * 100;

  if (total === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good " stats={good} />
        <StatisticLine text="neutral " stats={neutral} />
        <StatisticLine text="bad " stats={bad} />
        <StatisticLine text="all " stats={total} />
        <StatisticLine text="average " stats={average} />
        <StatisticLine text="positive " stats={positive + "%"} />
        </tbody>
      </table>
        
      
    );
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
