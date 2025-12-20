// src/pages/Auth.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiX,
  FiCheck,
} from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { loginUser, signupUser, googleLogin } from "../services/api";

export default function Auth() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    adminSecret: "",
  });

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email required";
    if (!form.password) e.password = "Password required";
    if (form.password && form.password.length < 6)
      e.password = "Minimum 6 characters";

    if (mode === "signup") {
      if (!form.name) e.name = "Full name required";
      if (form.confirm !== form.password)
        e.confirm = "Passwords do not match";
    }
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    setErrors({});
    setSuccess("");

    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    try {
      setLoading(true);
      let res;

      if (mode === "login") {
        res = await loginUser({
          email: form.email,
          password: form.password,
        });
      } else {
        res = await signupUser({
          name: form.name,
          email: form.email,
          password: form.password,
          adminSecret: form.adminSecret || undefined,
        });
      }

      // Store token & user
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      setSuccess(mode === "login" ? "Login successful!" : "Account created!");

      setTimeout(() => {
        if (res.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1000);

    } catch (err) {
      setErrors({ api: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      const res = await googleLogin({
        email: "demo@gmail.com",
        name: "Google User",
      });

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      setSuccess("Signed in with Google!");

      setTimeout(() => {
        if (res.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (err) {
      setErrors({ api: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#1a1208] to-[#3b240f] px-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-white/10">

        {/* LEFT PANEL */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-b from-[#140b05] to-black">
          <h1 className="text-3xl font-bold text-orange-400">Village CHEF</h1>
          <p className="text-gray-400">
            {mode === "login"
              ? "Login to enjoy premium food experience"
              : "Create account and start ordering"}
          </p>
          <p className="text-xs text-gray-500">© 2025 Village CHEF</p>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-[#0c0805] p-8 text-white">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              {mode === "login" ? "Login" : "Sign Up"}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setMode("login")}
                className={`px-3 py-1 rounded-full text-sm ${
                  mode === "login"
                    ? "bg-orange-500 text-black"
                    : "border border-white/20"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`px-3 py-1 rounded-full text-sm ${
                  mode === "signup"
                    ? "bg-orange-500 text-black"
                    : "border border-white/20"
                }`}
              >
                Signup
              </button>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="text-sm text-gray-400 flex gap-2">
                  <FiUser /> Full Name
                </label>
                <input
                  className="input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="text-sm text-gray-400 flex gap-2">
                <FiMail /> Email
              </label>
              <input
                className="input"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="relative">
              <label className="text-sm text-gray-400 flex gap-2">
                <FiLock /> Password
              </label>
              <input
                className="input pr-10"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            {mode === "signup" && (
              <>
                <div>
                  <label className="text-sm text-gray-400">
                    Confirm Password
                  </label>
                  <input
                    className="input"
                    type="password"
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  />
                  {errors.confirm && <p className="error">{errors.confirm}</p>}
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Admin Secret (optional)
                  </label>
                  <input
                    className="input"
                    type="password"
                    placeholder="Only for admins"
                    value={form.adminSecret}
                    onChange={(e) => setForm({ ...form, adminSecret: e.target.value })}
                  />
                </div>
              </>
            )}

            <button
              disabled={loading}
              className="w-full py-3 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-600"
            >
              {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
            </button>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-gray-500">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              className="w-full flex justify-center gap-3 py-3 rounded-full border border-white/20 hover:bg-white/5"
            >
              <FaGoogle /> Continue with Google
            </button>

            {success && (
              <div className="success">
                <FiCheck /> {success}
              </div>
            )}

            {errors.api && (
              <div className="errorBox">
                <FiX /> {errors.api}
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          background: #000;
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 12px;
          color: white;
          margin-top: 6px;
        }
        .input:focus { border-color: #f97316; outline: none; }
        .error { color: #f87171; font-size: 12px; margin-top: 4px; }
        .success {
          margin-top: 16px;
          padding: 10px;
          border: 1px solid #047857;
          color: #34d399;
          border-radius: 10px;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .errorBox {
          margin-top: 16px;
          padding: 10px;
          border: 1px solid #7f1d1d;
          color: #f87171;
          border-radius: 10px;
          display: flex;
          gap: 8px;
          align-items: center;
        }
      `}</style>
    </div>
  );
}