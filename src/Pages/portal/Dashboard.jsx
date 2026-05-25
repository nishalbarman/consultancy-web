import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardSkeleton } from "../../components/Skeleton";
import { createOrder, getDashboard } from "../../services/api";
import { theme } from "../../theme";

const inputClass = `w-full rounded-2xl border border-slate-200 px-4 py-3 font-medium outline-none ${theme.focus}`;

function Dashboard() {
  const navigate = useNavigate();
  const toast = ({ title }) => window.alert(title);
  const token = localStorage.getItem("userToken");
  const [dashboard, setDashboard] = useState(null);
  const [form, setForm] = useState({ serviceTitle: "Web App Development", projectName: "", description: "", timeline: "" });

  const loadDashboard = async () => setDashboard(await getDashboard(token));

  useEffect(() => {
    if (!token) return navigate("/portal");
    loadDashboard().catch(() => navigate("/portal"));
  }, []);

  const updateForm = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const submitOrder = async () => {
    try {
      await createOrder(token, form);
      setForm((prev) => ({ ...prev, projectName: "", description: "", timeline: "" }));
      await loadDashboard();
      toast({ title: "Order request created", status: "success", position: "top" });
    } catch (error) {
      toast({ title: error.message, status: "error", position: "top" });
    }
  };

  if (!dashboard) return <DashboardSkeleton />;

  return (
    <main className="min-h-screen bg-slate-50 px-5 pt-28 text-slate-950 sm:px-8 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 rounded-3xl bg-slate-950 p-7 text-white shadow-2xl shadow-slate-950/15 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className={`rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold ${theme.textPale}`}>Client Dashboard</span>
            <h1 className="mt-4 text-3xl font-black">Welcome, {dashboard.user.name}</h1>
            <p className="mt-2 text-slate-300">Review your orders and request new service work.</p>
          </div>
          <button className="w-fit rounded-xl border border-white/20 px-5 py-3 font-bold hover:bg-white hover:text-slate-950" onClick={() => {
            localStorage.removeItem("userToken");
            localStorage.removeItem("portalUser");
            navigate("/portal");
          }}>
            Logout
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["Total orders", dashboard.stats.totalOrders],
            ["Active", dashboard.stats.activeOrders],
            ["Delivered", dashboard.stats.deliveredOrders],
          ].map(([label, value]) => (
            <article key={label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <strong className="block text-3xl font-black">{value}</strong>
              <span className="font-bold text-slate-500">{label}</span>
            </article>
          ))}
        </div>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black">New order request</h2>
            <select className={inputClass} name="serviceTitle" value={form.serviceTitle} onChange={updateForm}>
              <option>Web App Development</option>
              <option>App Development</option>
              <option>Backend and API Development</option>
              <option>Admin Panel Development</option>
            </select>
            <input className={inputClass} name="projectName" placeholder="Project name" value={form.projectName} onChange={updateForm} />
            <input className={inputClass} name="timeline" placeholder="Expected timeline" value={form.timeline} onChange={updateForm} />
            <textarea className={`${inputClass} min-h-32`} name="description" placeholder="Tell us what you need" value={form.description} onChange={updateForm} />
            <button className={`rounded-2xl ${theme.bg} px-5 py-3 font-black text-white ${theme.bgHover}`} onClick={submitOrder}>Submit order</button>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black">Your orders</h2>
            <div className="mt-4 grid gap-4">
              {dashboard.orders.length === 0 && <p className="text-slate-500">No orders yet.</p>}
              {dashboard.orders.map((order) => (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5" key={order._id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <strong className="block text-lg">{order.projectName}</strong>
                      <span className="text-sm font-bold text-slate-500">{order.serviceTitle}</span>
                    </div>
                    <span className={`rounded-full ${theme.bgSoft} px-3 py-1 text-xs font-black uppercase ${theme.text}`}>{order.status}</span>
                  </div>
                  <p className="mt-3 leading-7 text-slate-600">{order.description || "No description added."}</p>
                  <small className="text-slate-500">{new Date(order.createdAt).toLocaleString()}</small>
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}

export default Dashboard;
