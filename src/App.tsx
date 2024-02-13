import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
