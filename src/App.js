import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import FormAddEdit from "./components/FormAddEdit";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <ToastContainer position="top-right" autoClose={2000}/>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<FormAddEdit />} />
        <Route path="/update/:id" element={<FormAddEdit />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>

      <Footer/>
    </BrowserRouter>
  );
}

export default App;
