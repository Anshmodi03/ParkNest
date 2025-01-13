import React, { useState, useRef, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

// Lazy loading components
const Header = lazy(() => import("../Header/Header"));
const Example = lazy(() => import("./ClipPathLinks"));

const ContactPage = () => {
  const form = useRef(); // Create a ref for the form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send email using Email.js
    emailjs
      .sendForm(
        "service_gsblk68", // Replace with your actual service ID
        "template_x0tg3cr", // Replace with your actual template ID
        form.current, // Pass the form ref
        "uqB-a8MYRNqN2X1ny" // Replace with your public key
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          setTimeout(() => {
            navigate("/"); // Redirect after a delay
          }, 2000);
        },
        (error) => {
          console.error("Failed to send email:", error.text);
          setStatus("Failed to send message. Please try again.");
        }
      );

    // Send data to the backend (if needed)
    try {
      const response = await import("axios");
      await response.default.post(
        "http://localhost:8000/api/contact",
        formData
      );
    } catch (error) {
      console.error("Error saving contact data:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/Parkme_insdie.jpeg')",
        outline: "none",
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <div className="text-white grid grid-cols-1 md:grid-cols-2 gap-8 py-12 px-6 outline-none">
        <div className="w-full max-w-2xl mx-auto p-8 bg-transparent rounded-xl outline-none shadow-xl backdrop-blur-sm">
          <h1 className="text-5xl font-bold text-center text-white mb-6">
            Reach Out
          </h1>
          <p className="text-center text-xl mb-8">
            We'd love to hear your feedback or answer any questions.
          </p>
          <form ref={form} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-lg text-white mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 bg-transparent border-b-2 border-white text-white shadow-md focus:ring-2 outline-none"
                required
              />
            </div>
            <div>
              <label className="text-lg text-white mb-2">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 bg-transparent border-b-2 border-white text-white shadow-md focus:ring-2 outline-none"
                required
              />
            </div>
            <div>
              <label className="text-lg text-white mb-2">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full max-h-32 min-h-32 p-4 border-b-2 border-white bg-transparent text-white outline-none shadow-md focus:ring-2"
                rows="6"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-50 py-3 text-white rounded-lg hover:bg-white hover:text-black focus:ring-2 transition duration-300"
            >
              Send Message
            </button>
          </form>
          {status && <p className="mt-4 text-center text-white">{status}</p>}
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Example />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
