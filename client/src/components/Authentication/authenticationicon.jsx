import React, { useState, Suspense, lazy } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy load the AuthPopup component
const AuthPopup = lazy(() => import("./AuthPopup"));

const AuthenticationIcon = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  ); // Check if user is already logged in

  const handleButtonClick = () => {
    if (isAuthenticated) {
      // Logout logic
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      toast.dark("Logged out successfully!", {
        position: "top-center", // Align toast at the center
        autoClose: 1500, // Set autoClose time to 1.5 seconds
        hideProgressBar: false,
        theme: "dark",
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black background
        },
      });
    } else {
      setPopupOpen(true); // Open the popup for login
    }
  };

  const handleClosePopup = () => {
    setPopupOpen(false); // Close the popup
  };

  return (
    <StyledWrapper>
      <button className="Btn" onClick={handleButtonClick}>
        <div className="sign">
          <svg viewBox="0 0 512 512">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
          </svg>
        </div>
        <div className="text">{isAuthenticated ? "Logout" : "Login"}</div>
      </button>

      {/* AuthPopup Component */}
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <AuthPopup
          open={isPopupOpen}
          handleClose={handleClosePopup}
          setIsAuthenticated={setIsAuthenticated}
        />
      </Suspense>

      {/* ToastContainer to display toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: 0.3s;
    background-color: transparent;
  }

  .sign {
    width: 100%;
    transition-duration: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sign svg {
    width: 17px;
    margin-top: 7px;
  }

  .sign svg path {
    fill: white;
  }

  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.2em;
    font-weight: 600;
    transition-duration: 0.3s;
  }

  .Btn:hover {
    width: 125px;
    border-radius: 40px;
  }

  .Btn:hover .sign {
    width: 30%;
    padding-left: 20px;
  }

  .Btn:hover .text {
    opacity: 1;
    width: 70%;
    padding-right: 10px;
  }

  .Btn:active {
    transform: translate(2px, 2px);
  }

  .sign svg {
    width: 17px;
    margin-top: 7px;
  }

  /* For small screens (max-width: 600px) */
  @media (max-width: 600px) {
    .sign svg {
      width: 14px; /* Decrease width for small screens */
      margin-top: 5px; /* Adjust margin */
    }
  }

  /* For medium screens (min-width: 601px and max-width: 1024px) */
  @media (min-width: 400px) and (max-width: 600px) {
    .sign svg {
      width: 16px; /* Slightly larger than for small screens */
      margin-top: 19px; /* Adjust margin */
    }
  }
`;

export default AuthenticationIcon;
