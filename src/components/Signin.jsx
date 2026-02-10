import React, { useState } from "react";
import { loginUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Signin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const result = loginUser(email, password);

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert("Login successful!");
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-6">

      <h2 className="text-2xl font-bold mb-4">
        Login
      </h2>

      <form onSubmit={handleLogin} className="space-y-3">

        <input
          placeholder="Email"
          type="email"
          required
          className="border p-2 w-full"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          required
          className="border p-2 w-full"
          onChange={e => setPassword(e.target.value)}
        />

        <button className="bg-green-500 text-white w-full py-2 rounded">
          Sign In
        </button>

      </form>

    </div>
  );
};

export default Signin;
