import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 px-8 shadow-md bg-transparent">
      {/* Logo Section */}
      <div className="flex items-center space-x-3 flex-grow">
        <img
          src="/parkme-high-resolution-logo-transparent-(1).png"
          alt="Logo"
          className="h-20 w-50"
        />
      </div>

      {/* Slide Tabs Menu aligned to the right */}
      <div className="flex items-center">
        <SlideTabs />
      </div>
    </header>
  );
};

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative flex w-fit rounded-full border-[1px] border-white p-1 "
    >
      <Tab setPosition={setPosition}>
        <Link to="/">Home</Link>
      </Tab>
      <Tab setPosition={setPosition}>
        <Link to="/Features">Features</Link>
      </Tab>
      <Tab setPosition={setPosition}>
        <Link to="/about">About Us</Link>
      </Tab>
      <Tab setPosition={setPosition}>
        <Link to="/contact">Contact Us</Link>
      </Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full border border-white md:h-12"
    />
  );
};

export default Header;
