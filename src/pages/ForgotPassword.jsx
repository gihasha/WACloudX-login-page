import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your email to reset your password");
    } catch (err) {
      setError("Email not found");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          {message && <p className="text-green-500 text-sm mb-2">{message}</p>}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Send Reset Email
          </button>
        </form>
      </div>
    </div>
  );
}
