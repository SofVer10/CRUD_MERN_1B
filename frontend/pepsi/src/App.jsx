import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import './App.css'
import Nav from "./components/Nav"

import Agregarcliente from "./pages/client"
import AgregarLocal from "./pages/locals"
import AgregarProducto from "./pages/products"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Nav/>
        <Routes>
          <Route path="/clients" element={<Agregarcliente />} />
          <Route path="/locals" element={<AgregarLocal />} />
          <Route path="/prducts" element={<AgregarProducto />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
