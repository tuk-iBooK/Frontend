import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUp";
import SettingPageFirst from "./pages/SettingPageFirst";
import SettingPage from "./pages/SettingPage";
import GenreSettingPage from "./pages/GenreSettingPage";
import PeriodSettingPage from "./pages/PeriodSettingPage";
import BackgroundSettingPage from "./pages/BackgroundSettingPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/settingfirst" element={<SettingPageFirst />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/genre" element={<GenreSettingPage />} />
          <Route path="/period" element={<PeriodSettingPage />} />
          <Route path="/background" element={<BackgroundSettingPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
