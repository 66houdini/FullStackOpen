import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

interface WelcomeProps {
  name: string;
}
// There is actually no need to define the return type of a React component since the TypeScript compiler infers the type automatically, so we can just write:
// const Welcome = (props: WelcomeProps): JSX.Element => {
//   return <h1>Hello, {props.name}</h1>;
// };
const Welcome = (props: WelcomeProps) => {
  return <h1>Hello, {props.name}</h1>;
};


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <Welcome name='Sarah' />
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
