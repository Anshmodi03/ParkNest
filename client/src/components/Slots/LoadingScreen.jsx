import React from "react";
import BarLoader from "../Loader/BarLoader.jsx";

const LoadingScreen = () => (
  <div className="flex flex-col justify-center items-center min-h-screen">
    <BarLoader />
    <p className="text-sm text-yellow-300 mt-4 text-center">
      If stuck at loading, please refresh the website.
    </p>
  </div>
);

export default LoadingScreen;
