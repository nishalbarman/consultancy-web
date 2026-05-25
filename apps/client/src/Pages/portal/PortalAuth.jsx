import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../services/api";
import { theme } from "../../theme";

const inputClass = `w-full rounded-2xl border border-slate-200 px-4 py-3 font-medium outline-none ${theme.focus}`;

function PortalAuth() {
  const navigate = useNavigate();
  const toast = ({ title }) => window.alert(title);
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const updateForm = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

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
      toast({ title: error.message, status: "error", position: "top" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`min-h-screen ${theme.portalWash} px-5 pt-32 text-slate-950`}>
      <section className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-slate-950 p-8 text-white sm:p-10">
          <span className={`rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold ${theme.textPale}`}>Client Portal</span>
          <h1 className="mt-6 text-3xl font-black leading-tight sm:text-4xl">
            Track orders, approvals, and service requests.
          </h1>
          <p className="mt-5 leading-8 text-slate-300">
            Register once, then use the dashboard to request new work and follow the status of your project orders.
          </p>
        </div>
        <div className="grid gap-4 p-6 sm:p-10">
          <h2 className="text-2xl font-black">{mode === "register" ? "Create your account" : "Login to your dashboard"}</h2>
          {mode === "register" && (
            <>
              <input className={inputClass} name="name" placeholder="Full name" value={form.name} onChange={updateForm} />
              <input className={inputClass} name="phone" placeholder="Phone" value={form.phone} onChange={updateForm} />
            </>
          )}
          <input className={inputClass} name="email" type="email" placeholder="Email" value={form.email} onChange={updateForm} />
          <input className={inputClass} name="password" type="password" placeholder="Password" value={form.password} onChange={updateForm} />
          <button className={`rounded-2xl ${theme.bg} px-5 py-3 font-black text-white shadow-lg ${theme.shadow} ${theme.bgHover} disabled:opacity-60`} onClick={submit} disabled={loading}>
            {loading ? "Please wait..." : mode === "register" ? "Register" : "Login"}
          </button>
          <button className={`font-bold ${theme.text} ${theme.textHover}`} onClick={() => setMode(mode === "register" ? "login" : "register")}>
            {mode === "register" ? "Already have an account? Login" : "New client? Register"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default PortalAuth;
