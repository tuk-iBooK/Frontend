import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store"; // Redux store를 import 합니다.
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import GenreSettingPage from "./pages/GenreSettingPage";
import PeriodSettingPage from "./pages/PeriodSettingPage";
import BackgroundSettingPage from "./pages/BackgroundSettingPage";
import CharacterSettingPage from "./pages/CharacterSettingPage";
import SummarySettingPage from "./pages/SummarySettingPage";
import FirstResultPage from "./pages/FirstResultPage";
import ResultPage from "./pages/ResultPage";
import FlipBook from "./pages/FlipBook";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div className="App">
          <Routes>
            <Route path="" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/genre" element={<GenreSettingPage />} />
            <Route path="/period" element={<PeriodSettingPage />} />
            <Route path="/background" element={<BackgroundSettingPage />} />
            <Route path="/character" element={<CharacterSettingPage />} />
            <Route path="/summary" element={<SummarySettingPage />} />
            <Route path="/firstresult" element={<FirstResultPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/flipbook" element={<FlipBook />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
