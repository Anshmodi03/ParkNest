import React from "react";
import { AiOutlineCar } from "react-icons/ai";

const NeumorphismButton = () => {
  return (
    <button
      type="submit"
      className={`hover:text-violet-600
        px-4 py-2 rounded-full 
        flex items-center gap-4 
        text-black
        shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
        
        transition-all

        hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.8),_1px_1px_5px_rgba(0,_0,_0,_0.9),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)] 
    `}
    >
      <AiOutlineCar />
      <span className="text-black shadow-none border-none mt-2 hover:-mt-3 hover:border-opacity-5">
        Reserve Spot
      </span>
    </button>
  );
};

export default NeumorphismButton;
