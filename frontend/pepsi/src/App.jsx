import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import './App.css'
import Nav from "./components/Nav"
import Home from "./pages/Home"
import AgregarCliente from "./pages/client"
import AgregarLocal from "./pages/locals"
import AgregarProducto from "./pages/products"

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Router>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<AgregarCliente />} />
          <Route path="/locals" element={<AgregarLocal />} />
          <Route path="/products" element={<AgregarProducto />} />
        </Routes>
      </Router>
    </>
  )                                    
}

export default App