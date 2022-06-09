import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Error from "./pages/Error";
import Test from "./pages/Test";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/test/:slug" element={<Test />} />
        <Route element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;