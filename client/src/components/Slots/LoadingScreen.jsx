// LoadingScreen.jsx
import React from "react";
import BarLoader from "../Loader/BarLoader.jsx";

const LoadingScreen = () => (
  <div className="flex justify-center items-center min-h-screen">
    <BarLoader />
  </div>
);

export default LoadingScreen;
