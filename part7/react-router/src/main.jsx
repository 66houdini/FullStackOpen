/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import { Router } from "react-router-dom";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Router>
//     <App />
//   </Router>
// );

import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import { Table, Form, Button } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"
import App from './App'




ReactDOM.createRoot(document.getElementById('root')).render(<Router><App /></Router>)