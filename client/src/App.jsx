import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import Signup from './Signup';
import Login from './Login';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
