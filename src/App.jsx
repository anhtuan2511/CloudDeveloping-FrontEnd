import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Pricing from "./components/Pricing"
import Success from "./components/Success";
import Failed from "./components/Failed";

function App() {

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="success" element={<Success />} />
        <Route path="failed" element={<Failed />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
