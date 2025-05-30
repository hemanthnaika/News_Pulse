import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import Home from './pages/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage'

const App = () => {
  return (
    <BrowserRouter>
    
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/category/:name" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
