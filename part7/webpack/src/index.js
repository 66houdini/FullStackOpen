import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"

import App from "./App"
import React from 'react'
import ReactDOM from 'react-dom/client'
import PromisePolyfill from "promise-polyfill"
if (!window.Promise) {
    window.Promise = PromisePolyfill
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />)