import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard_Page from "./Admin_Pages/Dashboard_Page/AdminDashboard";
import "./Assets/Styles/global.css";
import AnnouncementPage from "./Landing_Pages/Announcement_Page/Announcement";
import GeotaggingPage from "./Landing_Pages/Geotagging_Page/GeotaggingPage";
import HomePage from "./Landing_Pages/Home_Page/HomePage";
import AdminSignin_Page from "./Landing_Pages/LoginRegister_Pages/AdminSigninPage";
import SchedulePage from "./Landing_Pages/Schedule_Page/SchedulePage";


export default function App() {

  return (
    <div className="App">
        <Routes>

          {/* Landing Pages */}
          <Route path="/" element={<HomePage/>} />
          <Route path="/Announcemnents" element={<AnnouncementPage/>} />
          <Route path="/Geotagging" element={<GeotaggingPage/>} />
          <Route path="/Schedule" element={<SchedulePage/>} />

          {/* Admin Sign in Pages */}
          <Route path="/Administration_Sign_In" element={<AdminSignin_Page/>} />

          {/* Admin Pages */}
          <Route path="/Administration_Dashboard" element={<AdminDashboard_Page/>} />

        </Routes>
    </div>
  );
}