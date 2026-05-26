import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiLock, FiMail, FiUser } from "react-icons/fi";
import { loginUser, registerUser } from "../../services/api";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100";

function PortalAuth() {
  const navigate = useNavigate();
  const toast = ({ title }) => window.alert(title);
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const updateForm = (event) =>
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const submit = async () => {
    setLoading(true);
    try {
      const response =
        mode === "register"
          ? await registerUser(form)
          : await loginUser({ email: form.email, password: form.password });
      localStorage.setItem("userToken", response.token);
      localStorage.setItem("portalUser", JSON.stringify(response.user));
      navigate("/portal/dashboard");
    } catch (error) {
      toast({ title: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 md:grid-cols-[1fr_1fr]">
        <div className="flex flex-col justify-center bg-slate-900 p-8 sm:p-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}>
            <div className="mb-6 grid h-10 w-10 place-items-center rounded-xl bg-white/10">
              <FiUser className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-black leading-tight text-white sm:text-3xl">
              {mode === "register" ? "Join the client portal" : "Welcome back"}
            </h1>
            <p className="mt-3 leading-relaxed text-slate-400">
              {mode === "register"
                ? "Create an account to request services, track order progress, and communicate with our team."
                : "Sign in to manage your orders, submit new requests, and track project status."}
            </p>
            <div className="mt-10 hidden space-y-4 sm:block">
              {[
                { label: "Track orders in real time" },
                { label: "Submit new service requests" },
                { label: "Secure client-only dashboard" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="grid h-5 w-5 place-items-center rounded-full bg-white/10 text-xs text-white">
                    ✓
                  </div>
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="p-8 sm:p-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}>
            <h2 className="text-xl font-black text-slate-900">
              {mode === "register" ? "Create account" : "Sign in"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {mode === "register"
                ? "Fill in your details to get started."
                : "Enter your credentials to continue."}
            </p>
            <div className="mt-6 grid gap-4">
              {mode === "register" && (
                <>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Full Name
                    </label>
                    <input
                      className={inputClass}
                      name="name"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={updateForm}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Phone
                    </label>
                    <input
                      className={inputClass}
                      name="phone"
                      placeholder="+91 9876543210"
                      value={form.phone}
                      onChange={updateForm}
                    />
                  </div>
                </>
              )}
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    className={`${inputClass} pl-10`}
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={updateForm}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    className={`${inputClass} pl-10`}
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={updateForm}
                    onKeyDown={(e) => e.key === "Enter" && submit()}
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={submit}
                disabled={loading}>
                {loading
                  ? "Please wait..."
                  : mode === "register"
                    ? "Create Account"
                    : "Sign In"}
                {!loading && <FiArrowRight className="h-4 w-4" />}
              </motion.button>
            </div>
            <div className="mt-6 border-t border-slate-100 pt-4 text-center">
              <p className="text-sm text-slate-500">
                {mode === "register"
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  className="font-bold text-slate-900 underline underline-offset-4 hover:text-slate-600"
                  onClick={() =>
                    setMode(mode === "register" ? "login" : "register")
                  }>
                  {mode === "register" ? "Sign in" : "Create one"}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}

export default PortalAuth;
