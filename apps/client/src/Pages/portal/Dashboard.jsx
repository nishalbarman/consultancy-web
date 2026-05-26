import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiClock, FiLogOut, FiPackage, FiPlus, FiSend, FiUser, FiCheckCircle, FiLoader, FiX, FiAlertCircle } from "react-icons/fi";
import { DashboardSkeleton } from "../../components/Skeleton";
import { createOrder, getDashboard, getSiteData } from "../../services/api";
import ReCaptchaWidget from "../../components/ReCaptchaWidget";

const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100";

const statusConfig = {
  requested: { color: "bg-amber-100 text-amber-700 border-amber-200", icon: FiClock, label: "Requested" },
  confirmed: { color: "bg-blue-100 text-blue-700 border-blue-200", icon: FiCheckCircle, label: "Confirmed" },
  "in-progress": { color: "bg-purple-100 text-purple-700 border-purple-200", icon: FiLoader, label: "In Progress" },
  delivered: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: FiCheckCircle, label: "Delivered" },
  cancelled: { color: "bg-red-100 text-red-700 border-red-200", icon: FiX, label: "Cancelled" },
};

function Dashboard() {
  const navigate = useNavigate();
  const toast = ({ title }) => window.alert(title);
  const token = localStorage.getItem("userToken");
  const user = JSON.parse(localStorage.getItem("portalUser") || "{}");
  const [dashboard, setDashboard] = useState(null);
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [recaptcha, setRecaptcha] = useState("");
  const recaptchaRef = useRef(null);
  const [form, setForm] = useState({ serviceTitle: "", projectName: "", description: "", timeline: "" });

  const loadDashboard = async () => setDashboard(await getDashboard(token));
  const loadServices = async () => {
    try {
      const site = await getSiteData();
      setServices(site.services || []);
      if (site.services?.length && !form.serviceTitle) {
        setForm(p => ({ ...p, serviceTitle: site.services[0].title }));
      }
    } catch {} // silently fail — services are optional
  };

  useEffect(() => {
    if (!token) return navigate("/portal");
    loadDashboard().catch(() => navigate("/portal"));
    loadServices();
  }, []);
  const updateForm = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submitOrder = async () => {
    if (!form.projectName.trim() || !form.description.trim()) { toast({ title: "Please fill in project name and description." }); return; }
    if (!recaptcha) { toast({ title: "Please complete the reCAPTCHA verification." }); return; }
    setSubmitting(true);
    try { await createOrder(token, { ...form, recaptcha }); setForm({ serviceTitle: services[0]?.title || "", projectName: "", description: "", timeline: "" }); setRecaptcha(""); recaptchaRef.current?.reset(); setShowForm(false); await loadDashboard(); toast({ title: "Order created! We'll review it shortly." }); }
    catch (error) { toast({ title: error.message }); recaptchaRef.current?.reset(); setRecaptcha(""); }
    finally { setSubmitting(false); }
  };

  if (!dashboard) return <DashboardSkeleton />;

  const stats = [
    { label: "Total Orders", value: dashboard.stats.totalOrders, icon: FiPackage },
    { label: "In Progress", value: dashboard.stats.activeOrders, icon: FiLoader },
    { label: "Delivered", value: dashboard.stats.deliveredOrders, icon: FiCheckCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">{user.name?.charAt(0)?.toUpperCase() || "U"}</div>
            <div className="hidden sm:block"><p className="text-sm font-bold text-slate-900">Welcome, {user.name}</p><p className="text-xs text-slate-500">Client Portal</p></div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"><FiPlus className="h-4 w-4" /> New Order</button>
            <button onClick={() => { localStorage.removeItem("userToken"); localStorage.removeItem("portalUser"); navigate("/portal"); }} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"><FiLogOut className="h-4 w-4" /> <span className="hidden sm:inline">Sign Out</span></button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.article key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-600"><stat.icon className="h-5 w-5" /></div>
              <strong className="block text-3xl font-black text-slate-900">{stat.value}</strong>
              <span className="text-sm font-semibold text-slate-500">{stat.label}</span>
            </motion.article>
          ))}
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between"><h2 className="text-xl font-black text-slate-900">Your Orders</h2><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{dashboard.orders.length} total</span></div>
          <div className="mt-4 grid gap-4">
            {dashboard.orders.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-slate-100"><FiPackage className="h-6 w-6 text-slate-400" /></div>
                <h3 className="text-lg font-bold text-slate-900">No orders yet</h3>
                <p className="mt-1 text-sm text-slate-500">Ready to get started? Submit your first service request.</p>
                <button onClick={() => setShowForm(true)} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"><FiPlus className="h-4 w-4" /> Create your first order</button>
              </div>
            )}
            <AnimatePresence>
              {dashboard.orders.map((order, i) => {
                const status = statusConfig[order.status] || statusConfig.requested;
                const StatusIcon = status.icon;
                return (
                  <motion.div key={order._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-slate-900">{order.projectName}</h3>
                          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold ${status.color}`}><StatusIcon className="h-3 w-3" /> {status.label}</span>
                        </div>
                        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                          <span className="rounded-lg bg-slate-100 px-2 py-0.5 font-medium">{order.serviceTitle}</span>
                          {order.timeline && <><span className="text-slate-300">·</span><span className="inline-flex items-center gap-1"><FiClock className="h-3.5 w-3.5" /> {order.timeline}</span></>}
                        </div>
                        {order.description && <p className="mt-3 text-sm leading-relaxed text-slate-600">{order.description}</p>}
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <span className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        <span className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                    </div>
                    {order.status !== "cancelled" && (
                      <div className="mt-5 border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-1">
                          {["requested", "confirmed", "in-progress", "delivered"].map((step, idx) => {
                            const stepIdx = ["requested", "confirmed", "in-progress", "delivered"].indexOf(order.status);
                            const isComplete = idx <= stepIdx;
                            return <React.Fragment key={step}><div className={`h-1.5 w-1.5 rounded-full ${isComplete ? "bg-slate-900" : "bg-slate-200"}`} />{idx < 3 && <div className={`h-0.5 flex-1 rounded ${isComplete ? "bg-slate-900" : "bg-slate-200"}`} />}</React.Fragment>;
                          })}
                        </div>
                        <div className="mt-2 flex justify-between text-[10px] font-semibold uppercase tracking-wider text-slate-400"><span>Requested</span><span>Confirmed</span><span>In Progress</span><span>Delivered</span></div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={() => setShowForm(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed inset-x-5 top-20 z-50 mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-full sm:-translate-x-1/2">
              <div className="mb-5 flex items-center justify-between"><div><h2 className="text-xl font-black text-slate-900">New Order Request</h2><p className="mt-1 text-sm text-slate-500">Tell us what you need built.</p></div><button onClick={() => setShowForm(false)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"><FiX className="h-5 w-5" /></button></div>
              <div className="grid gap-4">
                <label className="grid gap-1.5"><span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Service Type</span>
                  <select className={inputClass} name="serviceTitle" value={form.serviceTitle} onChange={updateForm}>
                    {services.length === 0 && <option value="">Loading services...</option>}
                    {services.map(s => <option key={s._id || s.id} value={s.title}>{s.title}{s.price ? ` — ${s.price}` : ""}</option>)}
                  </select>
                </label>
                <label className="grid gap-1.5"><span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Project Name *</span><input className={inputClass} name="projectName" placeholder="e.g. E-commerce Dashboard" value={form.projectName} onChange={updateForm} /></label>
                <label className="grid gap-1.5"><span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Expected Timeline</span><input className={inputClass} name="timeline" placeholder="e.g. 2-4 weeks" value={form.timeline} onChange={updateForm} /></label>
                <label className="grid gap-1.5"><span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Description *</span><textarea className={`${inputClass} min-h-28 resize-y`} name="description" placeholder="Describe your project requirements, features, and goals..." value={form.description} onChange={updateForm} /></label>
                <div className="mb-2 flex justify-center">
                  <ReCaptchaWidget ref={recaptchaRef} onChange={setRecaptcha} />
                </div>
                <button onClick={submitOrder} disabled={submitting} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">{submitting ? <>Submitting...</> : <><FiSend className="h-4 w-4" /> Submit Order Request</>}</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;
