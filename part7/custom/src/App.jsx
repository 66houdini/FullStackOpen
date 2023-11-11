/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useCounter } from "./counter";

// const App = () => {

//   const counter = useCounter();
//   return (
//     <div>
//       <div>{counter.value}</div>
//       <button onClick={counter.increase}>plus</button>
//       <button onClick={counter.decrease}>minus</button>
//       <button onClick={counter.zero}>zero</button>
//     </div>
//   );
// };


const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  return {type, value, onChange}
}

const App = () => {
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
      <form>
        name:
        {/* <input type={name.type} value={name.value} onChange={name.onChange} /> */}
       <input {...name} />
       <br/> 
        birthdate:
        <input {...born} />
        <br /> 
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  )
}

export default App