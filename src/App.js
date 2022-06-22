import React from "react";
import { Routes, Route } from "react-router-dom";
import "./Assets/Styles/global.css";
import AnnouncementPage from "./Landing_Pages/Announcement";
import CovidcasesPage from "./Landing_Pages/CovidcasesPage";
import GeotaggingPage from "./Landing_Pages/GeotaggingPage";
import HomePage from "./Landing_Pages/HomePage";
import SchedulePage from "./Landing_Pages/SchedulePage";

export default function App() {

  return (
    <div className="App">
        <Routes>

          {/* Landing Pages */}
          <Route path="/" element={<HomePage/>} />
          <Route path="/Announcemnents" element={<AnnouncementPage/>} />
          <Route path="/Geotagging" element={<GeotaggingPage/>} />
          <Route path="/Schedule" element={<SchedulePage/>} />
          <Route path="/CovidCases" element={<CovidcasesPage/>} />
        </Routes>
    </div>
  );
}