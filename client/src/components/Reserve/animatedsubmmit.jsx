import React from "react";

const ButtonWrapper = () => {
  return (
    <button
      type="submit"
      className={`
        px-4 py-2 rounded-lg 
        flex items-center gap-4 
        bg-transparent border border-white text-white font-semibold 
        shadow-md
        transition-all duration-300 ease-in-out
        hover:shadow-lg hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        ml-32 sm:ml-52 md:ml-42 lg:ml-40 xl:ml-60 mb-4 sm:mb-2
      `}
    >
      <span className="mt-1">Reserve Spot</span>
    </button>
  );
};

export default ButtonWrapper;
