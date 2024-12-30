import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ParkingSpotList from "./components/ParkingSpotList";
import HeroSection from "./components/HeroSection";
import SlotsPage from "./components/SlotsPage";
import { TextParallaxContentExample } from "./components/Features";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import "./App.css";

const App = () => {
  const [newEntry, setNewEntry] = useState(null);

  const handleNewEntry = (entry) => {
    setNewEntry(entry);
  };

  useEffect(() => {
    // Optional auto-refresh on new entry
  }, [newEntry]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route
          path="/slots"
          element={<SlotsPage onNewEntry={handleNewEntry} />}
        />
        <Route path="/Features" element={<TextParallaxContentExample />} />
        <Route path="/about" element={<AboutPage className="text-white" />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/parking-spots"
          element={<ParkingSpotList onNewEntry={handleNewEntry} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
