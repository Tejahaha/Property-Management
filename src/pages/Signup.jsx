import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", role: 0 });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const BaseURL = "http://localhost:8080"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch(BaseURL+"/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.text();
      if (res.ok && data.toLowerCase().includes("user added")) {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setError("Network error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-gray-100">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-700 text-white" />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-700 text-white" />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-700 text-white" />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-700 text-white" />
          <input name="role" type="number" placeholder="Role (0 for user, 1 for admin)" value={form.role} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-700 text-white" />
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors">Sign Up</button>
        </form>
        {error && <div className="mt-4 text-red-400 text-center font-medium">{error}</div>}
        {success && <div className="mt-4 text-green-400 text-center font-medium">{success}</div>}
        <p className="mt-6 text-center text-gray-300">Already have an account? <a href="/login" className="text-indigo-400 hover:underline">Login</a></p>
      </div>
    </div>
  );
}

export default Signup;