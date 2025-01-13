import React, { useRef, useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Button = lazy(() => import("../Authentication/authenticationicon"));

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="py-4 px-8 shadow-md bg-transparent">
      {isMobile ? (
        <MobileHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      ) : (
        <DesktopHeader />
      )}
    </header>
  );
};

const DesktopHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3 flex-grow">
        <Link to="/">
          <img
            src="/parkme-high-resolution-logo-transparent-(1).png"
            alt="Logo"
            className="h-20 w-50"
          />
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <SlideTabs />
        <Suspense fallback={<div>Loading...</div>}>
          <Button className="ml-2" />
        </Suspense>
      </div>
    </div>
  );
};

const MobileHeader = ({ menuOpen, setMenuOpen }) => {
  return (
    <div className="flex items-center justify-between lg:hidden relative">
      <div className="flex items-center space-x-3 flex-grow">
        <Link to="/">
          <img
            src="/parkme-high-resolution-logo-transparent-(1).png"
            alt="Logo"
            className="h-20 w-50"
          />
        </Link>
      </div>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-white focus:outline-none"
      >
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-3/4 max-w-xs h-half bg-gradient-to-l from-black/90 via-black/80 to-black/60 text-white shadow-lg z-50 p-6 overflow-y-auto group"
            >
              <nav className="flex flex-col space-y-4">
                <SlideTabs isMobile />
                <div className="flex justify-center items-center mt-8">
                  <Suspense fallback={<div>Loading...</div>}>
                    <Button className="ml-2 group-hover:text-gradient bg-clip-text text-transparent hover:border-4 hover:border-blue-500 transition-all duration-500" />
                  </Suspense>
                </div>
              </nav>
            </motion.div>
            <div
              className="fixed inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/30 z-40"
              onClick={() => setMenuOpen(false)}
            ></div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const SlideTabs = ({ isMobile = false }) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const links = [
    { to: "/", label: "Home" },
    { to: "/Features", label: "Features" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className={`relative flex ${
        isMobile
          ? "flex-col space-y-4"
          : "w-fit rounded-full border-[1px] border-white p-1"
      }`}
    >
      {links.map(({ to, label }) => (
        <Tab key={to} setPosition={setPosition} isMobile={isMobile}>
          <Link
            to={to}
            className="text-white hover:text-blue-300" // Added hover color here
          >
            {label}
          </Link>
        </Tab>
      ))}
      {!isMobile && <Cursor position={position} />}
    </ul>
  );
};

const Tab = ({ children, setPosition, isMobile }) => {
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
      className={`relative z-10 block cursor-pointer ${
        isMobile
          ? "py-2 text-base uppercase text-white"
          : "px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
      }`}
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
