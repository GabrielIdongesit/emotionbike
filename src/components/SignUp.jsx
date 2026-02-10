import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // correct path


const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can call your real signupUser API if needed
    const result = { success: true }; // mock result

    if (!result.success) {
      alert("Signup failed!");
      return;
    }

    // Log in the user after signup
    login({ name: form.name, email: form.email });
    alert("Account created successfully!");
    navigate("/bikes"); // redirect to bike page
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create Account</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="Name"
          className="border p-2 w-full"
          required
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          type="email"
          className="border p-2 w-full"
          required
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          className="border p-2 w-full"
          required
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-green-500 text-white w-full py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
