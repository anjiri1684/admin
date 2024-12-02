import { useState } from "react";
// import api from "../api"; // Use axios instance with token handling
import axios from "axios";

const RegisterAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register-admin",
        {
          email,
          password,
        }
      );

      setMessage(response.data.message); // Success message
      setEmail(""); // Clear the input fields
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Error registering admin.");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <form
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Register Admin</h2>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            className="w-full p-3 bg-gray-700 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            className="w-full p-3 bg-gray-700 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="bg-blue-600 w-full py-2 rounded-lg hover:bg-blue-700">
          Register Admin
        </button>
      </form>
    </div>
  );
};

export default RegisterAdmin;
