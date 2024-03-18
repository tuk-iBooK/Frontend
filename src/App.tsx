import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store"; // Redux store를 import 합니다.
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUp";
import SettingPage from "./pages/SettingPage";
import GenreSettingPage from "./pages/GenreSettingPage";
import PeriodSettingPage from "./pages/PeriodSettingPage";
import BackgroundSettingPage from "./pages/BackgroundSettingPage";
import CharacterSettingPage from "./pages/CharacterSettingPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/genre" element={<GenreSettingPage />} />
            <Route path="/period" element={<PeriodSettingPage />} />
            <Route path="/background" element={<BackgroundSettingPage />} />
            <Route path="/character" element={<CharacterSettingPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
