import React, { useState, useEffect, lazy, Suspense } from "react";
import styled from "styled-components";
import axios from "axios";
import { IoIosClose } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy load MUI components
const Modal = lazy(() => import("@mui/material/Modal"));
const Typography = lazy(() => import("@mui/material/Typography"));
const TextField = lazy(() => import("@mui/material/TextField"));
const Button = lazy(() => import("@mui/material/Button"));

const AuthPopup = ({ open, handleClose, setIsAuthenticated }) => {
  const [authMode, setAuthMode] = useState("signup"); // 'signup' or 'login'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Reset form when modal is closed or authMode changes
  useEffect(() => {
    if (!open) {
      setFormData({ name: "", email: "", password: "" }); // Clear form data when closing the modal
      setError(""); // Reset error message
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAuth = async () => {
    try {
      const endpoint =
        authMode === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const { data } = await axios.post(
        `https://parkme-server.onrender.com${endpoint}`,
        formData
      );
      if (authMode === "login") {
        toast.success("Login Successful!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          theme: "dark",
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsAuthenticated(true); // Update authentication state
      } else {
        toast.info(data.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          theme: "dark",
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        });
      }
      handleClose(); // Close the modal on success
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
      toast.error(error, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        theme: "dark",
        style: {
          backgroundColor: "rgba(255, 0, 0, 0.7)",
        },
      });
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="auth-popup"
        aria-describedby="auth-popup-description"
      >
        <DarkOverlay>
          <StyledBox>
            <CloseIcon onClick={handleClose}>
              <IoIosClose />
            </CloseIcon>
            <Typography className="auth-title">
              {authMode === "signup" ? "Sign Up" : "Log In"}
            </Typography>
            <form className="auth-form" noValidate>
              {authMode === "signup" && (
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              )}
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-field"
              />
              {error && <p className="error-message">{error}</p>}
              <Button className="submit-button" fullWidth onClick={handleAuth}>
                {authMode === "signup" ? "Sign Up" : "Log In"}
              </Button>
            </form>
            <p
              className="toggle-mode"
              onClick={() => {
                setAuthMode(authMode === "signup" ? "login" : "signup");
                setError("");
                setFormData({ name: "", email: "", password: "" });
              }}
            >
              {authMode === "signup"
                ? "Already have an account? Log In"
                : "Don't have an account? Sign Up"}
            </p>
          </StyledBox>
        </DarkOverlay>
      </Modal>
    </Suspense>
  );
};

const DarkOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledBox = styled.div`
  position: relative;
  background: rgba(46, 46, 46, 0.45);
  backdrop-filter: blur(4px);
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  padding: 2rem;
  width: 400px;
  text-align: center;

  .auth-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 1.5rem;
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    .input-field {
      & label {
        color: #ffffff;
      }
      & .MuiInputBase-input {
        color: #fff;
      }
      & .MuiOutlinedInput-notchedOutline {
        border-color: #555;
      }
      &:hover .MuiOutlinedInput-notchedOutline {
        border-color: #888;
      }
      &.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #1976d2;
      }
      & input {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    .error-message {
      color: #f44336;
      font-size: 0.875rem;
      text-align: left;
    }
  }

  .submit-button {
    background: transparent;
    color: #ffffff;
    font-weight: bold;
    text-transform: none;
    border: 2px solid #1976d2;
    border-radius: 8px;
    padding: 0.75rem;
    &:hover {
      background: rgba(25, 118, 210, 0.1);
    }
  }

  .toggle-mode {
    margin-top: 1rem;
    font-size: 0.875rem;
    color: #4fc3f7;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2.5rem;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    color: #f44336;
  }
`;

export default AuthPopup;
