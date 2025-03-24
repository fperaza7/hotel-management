import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Hotels from "./pages/Hotels";
import HotelSettings from "./pages/HotelSettings";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<Hotels />}
          />
          <Route
            path="/hotels/:hotelId/settings"
            element={<HotelSettings />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
