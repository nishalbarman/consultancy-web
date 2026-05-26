import React, { useEffect, useState } from "react";
import {
  FiArrowLeft, FiBriefcase, FiFileText, FiFolder, FiGrid, FiImage,
  FiLogOut, FiMessageSquare, FiPlus, FiSave, FiServer, FiStar,
  FiTrash2, FiUser, FiUsers, FiEdit3, FiX, FiCheck, FiExternalLink,
  FiFilePlus,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { PageSkeleton, SkeletonBlock } from "../../components/Skeleton";
const RichTextEditor = React.lazy(() => import("../../components/RichTextEditor"));
import {
  apiRequest, getAdminItems, createAdminItem, updateAdminItem, deleteAdminItem,
  getCustomPages, createCustomPage, updateCustomPage, deleteCustomPage,
} from "../../services/api";

const sidebarItems = [
  { key: "dashboard", label: "Dashboard", icon: FiGrid },
  { key: "leads", label: "Leads", icon: FiMessageSquare },
  { key: "orders", label: "Orders", icon: FiBriefcase },
  { key: "services", label: "Services", icon: FiServer },
  { key: "projects", label: "Projects", icon: FiFolder },
  { key: "testimonials", label: "Testimonials", icon: FiStar },
  { key: "pages", label: "Pages", icon: FiFilePlus },
  { key: "profile", label: "Profile", icon: FiUser },
  { key: "site-files", label: "Site Files", icon: FiFileText },
];

const inputField = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100";
const textareaField = `${inputField} resize-y`;
const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50";
const btnOutline = "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50";
const btnDanger = "inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:border-red-300";
const pill = "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold";

function AdminPage() {
  const toast = ({ title, description }) => window.alert(title + (description ? `\n${description}` : ""));
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [content, setContent] = useState(null);
  const [active, setActive] = useState("dashboard");
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const loadContent = async (adminToken = token) => {
    const data = await apiRequest("/admin/content", { token: adminToken });
    setContent(data);
  };

  useEffect(() => {
    if (token) loadContent().catch(() => { localStorage.removeItem("adminToken"); setToken(""); });
  }, [token]);

  const login = async () => {
    const data = await apiRequest("/admin/login", { method: "POST", body: JSON.stringify({ email: adminEmail, password }) });
    localStorage.setItem("adminToken", data.token);
    setToken(data.token);
    setPassword("");
  };

  const logout = () => { localStorage.removeItem("adminToken"); setToken(""); };

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="mb-8">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white"><FiUser className="h-5 w-5" /></div>
            <h1 className="text-center text-2xl font-black text-slate-900">Admin Portal</h1>
            <p className="mt-2 text-center text-sm text-slate-500">Sign in to manage Technira.Space</p>
          </div>
          <div className="grid gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Email</label>
              <input className={inputField} type="email" placeholder="admin@technira.space" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Password</label>
              <input className={inputField} type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && login()} />
            </div>
            <button className={`${btnPrimary} py-3`} onClick={login}>Sign In</button>
          </div>
        </motion.div>
      </main>
    );
  }

  if (!content) return <PageSkeleton cards={4} />;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <button className="rounded-xl border border-slate-200 p-2 lg:hidden" onClick={() => setMobileSidebar(true)}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <span className="text-lg font-black text-slate-900">Admin<span className="text-slate-400">Panel</span></span>
          </div>
          <button onClick={logout} className={btnOutline}><FiLogOut className="h-4 w-4" /> Logout</button>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
          <nav className="sticky top-16 flex flex-col gap-1 p-4">
            {sidebarItems.map((item) => (
              <button key={item.key} onClick={() => setActive(item.key)}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${active === item.key ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
                <item.icon className="h-4 w-4" /> {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <AnimatePresence>
          {mobileSidebar && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setMobileSidebar(false)} />
              <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl lg:hidden">
                <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
                  <span className="font-black text-slate-900">Admin Panel</span>
                  <button onClick={() => setMobileSidebar(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"><FiX className="h-5 w-5" /></button>
                </div>
                <nav className="flex flex-col gap-1 p-4">
                  {sidebarItems.map((item) => (
                    <button key={item.key} onClick={() => { setActive(item.key); setMobileSidebar(false); }}
                      className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${active === item.key ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"}`}>
                      <item.icon className="h-4 w-4" /> {item.label}
                    </button>
                  ))}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 p-5 lg:p-8">
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            {active === "dashboard" && <DashboardOverview content={content} setActive={setActive} />}
            {active === "leads" && <LeadsPanel content={content} token={token} loadContent={loadContent} />}
            {active === "orders" && <OrdersPanel token={token} />}
            {active === "services" && <ServicesManager token={token} loadContent={loadContent} />}
            {active === "projects" && <ProjectsManager token={token} loadContent={loadContent} />}
            {active === "testimonials" && <TestimonialsManager token={token} loadContent={loadContent} />}
            {active === "pages" && <CustomPagesManager token={token} />}
            {active === "profile" && <ProfilePanel content={content} setContent={setContent} token={token} toast={toast} />}
            {active === "site-files" && <SiteFilesPanel content={content} setContent={setContent} token={token} toast={toast} />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

/* ────────────── Dashboard ────────────── */
function DashboardOverview({ content, setActive }) {
  const stats = [
    { label: "Total Leads", value: content.leads?.length || 0, icon: FiMessageSquare, action: () => setActive("leads") },
    { label: "Services", value: content.services?.length || 0, icon: FiServer, action: () => setActive("services") },
    { label: "Projects", value: content.projects?.length || 0, icon: FiFolder, action: () => setActive("projects") },
    { label: "Testimonials", value: content.testimonials?.length || 0, icon: FiStar, action: () => setActive("testimonials") },
  ];
  return (
    <div>
      <h1 className="text-2xl font-black text-slate-900">Dashboard</h1>
      <p className="mt-1 text-slate-500">Overview of your content and activity.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <button key={s.label} onClick={s.action} className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:shadow-md">
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-600"><s.icon className="h-5 w-5" /></div>
            <strong className="block text-3xl font-black text-slate-900">{s.value}</strong>
            <span className="text-sm font-semibold text-slate-500">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ────────────── Services Manager ────────────── */
function ServicesManager({ token, loadContent }) {
  const toast = ({ title }) => window.alert(title);
  const [items, setItems] = useState(null);
  const [view, setView] = useState("list");
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", summary: "", price: "", features: "" });

  const load = async () => { const d = await getAdminItems("services", token); setItems(d); };

  useEffect(() => { load(); }, []);

  const resetForm = () => setForm({ title: "", summary: "", price: "", features: "" });

  const openCreate = () => { resetForm(); setEditId(null); setView("edit"); };
  const openEdit = (item) => { setForm({ title: item.title || "", summary: item.summary || "", price: item.price || "", features: (item.features || []).join("\n") }); setEditId(item._id); setView("edit"); };

  const submit = async () => {
    setSaving(true);
    try {
      const payload = { ...form, features: form.features.split("\n").map(l => l.trim()).filter(Boolean) };
      if (editId) await updateAdminItem("services", editId, payload, token);
      else await createAdminItem("services", payload, token);
      await load();
      await loadContent();
      setView("list");
      toast({ title: editId ? "Service updated." : "Service created." });
    } catch (e) { toast({ title: e.message }); }
    finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try { await deleteAdminItem("services", id, token); await load(); await loadContent(); toast({ title: "Deleted." }); }
    catch (e) { toast({ title: e.message }); }
  };

  if (!items) return <PageSkeleton cards={3} />;

  if (view === "list") {
    return (
      <div>
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-black text-slate-900">Services</h1><p className="mt-1 text-slate-500">{items.length} services</p></div>
          <button onClick={openCreate} className={btnPrimary}><FiPlus className="h-4 w-4" /> Add Service</button>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-5 py-3 font-semibold text-slate-600">Title</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 hidden sm:table-cell">Summary</th>
                  <th className="px-5 py-3 font-semibold text-slate-600">Price</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 hidden md:table-cell">Features</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 w-28">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {items.map(item => (
                  <tr key={item._id} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3.5 font-semibold text-slate-900">{item.title}</td>
                    <td className="px-5 py-3.5 text-slate-500 max-w-xs truncate hidden sm:table-cell">{item.summary}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-900 font-medium">{item.price}</td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {(item.features || []).slice(0, 3).map(f => <span key={f} className={`${pill} bg-slate-100 text-slate-600`}>{f}</span>)}
                        {(item.features || []).length > 3 && <span className={`${pill} bg-slate-100 text-slate-500`}>+{item.features.length - 3}</span>}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1">
                        <button onClick={() => openEdit(item)} className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700"><FiEdit3 className="h-3.5 w-3.5" /></button>
                        <button onClick={() => remove(item._id)} className="grid h-8 w-8 place-items-center rounded-lg border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600"><FiTrash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-16 text-center text-slate-400">No services yet. Click "Add Service" to create one.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <button onClick={() => setView("list")} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"><FiArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-2xl font-black text-slate-900">{editId ? "Edit Service" : "New Service"}</h1>
      </div>
      <div className="mt-6 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5">
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Title <span className="text-red-400">*</span></span>
            <input className={inputField} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Web App Development" />
          </label>
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Summary <span className="text-red-400">*</span></span>
            <textarea className={textareaField} rows={3} value={form.summary} onChange={e => setForm(p => ({ ...p, summary: e.target.value }))} placeholder="Brief description of the service..." />
          </label>
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Price <span className="text-red-400">*</span></span>
            <input className={inputField} value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="e.g. From INR 25,000" />
          </label>
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Features <span className="text-red-400">*</span></span>
            <textarea className={textareaField} rows={5} value={form.features} onChange={e => setForm(p => ({ ...p, features: e.target.value }))} placeholder="One feature per line&#10;e.g. React Native apps&#10;API integration&#10;Play Store listing support" />
            <span className="text-xs text-slate-400">Enter each feature on a new line.</span>
          </label>
          <div className="flex gap-2 pt-2">
            <button onClick={submit} disabled={saving} className={`${btnPrimary} flex-1`}>{saving ? "Saving..." : <><FiSave className="h-4 w-4" /> {editId ? "Update Service" : "Create Service"}</>}</button>
            <button onClick={() => setView("list")} className={btnOutline}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────── Projects Manager ────────────── */
function ProjectsManager({ token, loadContent }) {
  const toast = ({ title }) => window.alert(title);
  const [items, setItems] = useState(null);
  const [view, setView] = useState("list");
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", type: "", summary: "", stack: "", url: "", playStoreUrl: "", featured: false });

  const load = async () => { const d = await getAdminItems("projects", token); setItems(d); };
  useEffect(() => { load(); }, []);

  const resetForm = () => setForm({ title: "", type: "", summary: "", stack: "", url: "", playStoreUrl: "", featured: false });
  const openCreate = () => { resetForm(); setEditId(null); setView("edit"); };
  const openEdit = (item) => { setForm({ title: item.title || "", type: item.type || "", summary: item.summary || "", stack: (item.stack || []).join(", "), url: item.url || "", playStoreUrl: item.playStoreUrl || "", featured: item.featured || false }); setEditId(item._id); setView("edit"); };

  const submit = async () => {
    setSaving(true);
    try {
      const payload = { ...form, stack: form.stack.split(",").map(s => s.trim()).filter(Boolean) };
      if (editId) await updateAdminItem("projects", editId, payload, token);
      else await createAdminItem("projects", payload, token);
      await load();
      await loadContent();
      setView("list");
      toast({ title: editId ? "Project updated." : "Project created." });
    } catch (e) { toast({ title: e.message }); }
    finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try { await deleteAdminItem("projects", id, token); await load(); await loadContent(); toast({ title: "Deleted." }); }
    catch (e) { toast({ title: e.message }); }
  };

  if (!items) return <PageSkeleton cards={3} />;

  if (view === "list") {
    return (
      <div>
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-black text-slate-900">Projects</h1><p className="mt-1 text-slate-500">{items.length} projects</p></div>
          <button onClick={openCreate} className={btnPrimary}><FiPlus className="h-4 w-4" /> Add Project</button>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-5 py-3 font-semibold text-slate-600">Title</th>
                  <th className="px-5 py-3 font-semibold text-slate-600">Type</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 hidden sm:table-cell">Summary</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 hidden md:table-cell">Stack</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 w-16 text-center">Featured</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 w-28">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {items.map(item => (
                  <tr key={item._id} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3.5 font-semibold text-slate-900">{item.title}</td>
                    <td className="px-5 py-3.5"><span className={`${pill} bg-slate-100 text-slate-600`}>{item.type}</span></td>
                    <td className="px-5 py-3.5 text-slate-500 max-w-xs truncate hidden sm:table-cell">{item.summary}</td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {(item.stack || []).map(s => <span key={s} className={`${pill} bg-slate-50 border border-slate-200 text-slate-600`}>{s}</span>)}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {item.featured ? <FiCheck className="mx-auto h-4 w-4 text-emerald-500" /> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1">
                        <button onClick={() => openEdit(item)} className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700"><FiEdit3 className="h-3.5 w-3.5" /></button>
                        <button onClick={() => remove(item._id)} className="grid h-8 w-8 place-items-center rounded-lg border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600"><FiTrash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-16 text-center text-slate-400">No projects yet. Click "Add Project" to create one.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <button onClick={() => setView("list")} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"><FiArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-2xl font-black text-slate-900">{editId ? "Edit Project" : "New Project"}</h1>
      </div>
      <div className="mt-6 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5">
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Title <span className="text-red-400">*</span></span>
            <input className={inputField} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Business Service Website" />
          </label>
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Type <span className="text-red-400">*</span></span>
            <input className={inputField} value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} placeholder="e.g. Web App, Website, Mobile App" />
          </label>
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Summary <span className="text-red-400">*</span></span>
            <textarea className={textareaField} rows={3} value={form.summary} onChange={e => setForm(p => ({ ...p, summary: e.target.value }))} placeholder="Brief description of the project..." />
          </label>
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tech Stack</span>
            <input className={inputField} value={form.stack} onChange={e => setForm(p => ({ ...p, stack: e.target.value }))} placeholder="React, Node.js, MongoDB (comma-separated)" />
          </label>
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Website URL</span>
            <input className={inputField} value={form.url} onChange={e => setForm(p => ({ ...p, url: e.target.value }))} placeholder="https://example.com" />
          </label>
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Play Store URL</span>
            <input className={inputField} value={form.playStoreUrl} onChange={e => setForm(p => ({ ...p, playStoreUrl: e.target.value }))} placeholder="https://play.google.com/store/apps/..." />
          </label>
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <input type="checkbox" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} className="h-5 w-5 rounded accent-slate-900" />
            <div>
              <span className="text-sm font-semibold text-slate-900">Featured Project</span>
              <p className="text-xs text-slate-500">Show this project on the homepage featured section.</p>
            </div>
          </label>
          <div className="flex gap-2 pt-2">
            <button onClick={submit} disabled={saving} className={`${btnPrimary} flex-1`}>{saving ? "Saving..." : <><FiSave className="h-4 w-4" /> {editId ? "Update Project" : "Create Project"}</>}</button>
            <button onClick={() => setView("list")} className={btnOutline}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────── Testimonials Manager ────────────── */
function TestimonialsManager({ token, loadContent }) {
  const toast = ({ title }) => window.alert(title);
  const [items, setItems] = useState(null);
  const [view, setView] = useState("list");
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", quote: "" });

  const load = async () => { const d = await getAdminItems("testimonials", token); setItems(d); };
  useEffect(() => { load(); }, []);

  const resetForm = () => setForm({ name: "", role: "", quote: "" });
  const openCreate = () => { resetForm(); setEditId(null); setView("edit"); };
  const openEdit = (item) => { setForm({ name: item.name || "", role: item.role || "", quote: item.quote || "" }); setEditId(item._id); setView("edit"); };

  const submit = async () => {
    setSaving(true);
    try {
      if (editId) await updateAdminItem("testimonials", editId, form, token);
      else await createAdminItem("testimonials", form, token);
      await load();
      await loadContent();
      setView("list");
      toast({ title: editId ? "Testimonial updated." : "Testimonial created." });
    } catch (e) { toast({ title: e.message }); }
    finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try { await deleteAdminItem("testimonials", id, token); await load(); await loadContent(); toast({ title: "Deleted." }); }
    catch (e) { toast({ title: e.message }); }
  };

  if (!items) return <PageSkeleton cards={3} />;

  if (view === "list") {
    return (
      <div>
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-black text-slate-900">Testimonials</h1><p className="mt-1 text-slate-500">{items.length} testimonials</p></div>
          <button onClick={openCreate} className={btnPrimary}><FiPlus className="h-4 w-4" /> Add Testimonial</button>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-5 py-3 font-semibold text-slate-600">Name</th>
                  <th className="px-5 py-3 font-semibold text-slate-600">Role</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 hidden sm:table-cell">Quote</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 w-28">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {items.map(item => (
                  <tr key={item._id} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3.5 font-semibold text-slate-900">{item.name}</td>
                    <td className="px-5 py-3.5"><span className={`${pill} bg-slate-100 text-slate-600`}>{item.role}</span></td>
                    <td className="px-5 py-3.5 text-slate-500 max-w-lg truncate italic hidden sm:table-cell">"{item.quote}"</td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1">
                        <button onClick={() => openEdit(item)} className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700"><FiEdit3 className="h-3.5 w-3.5" /></button>
                        <button onClick={() => remove(item._id)} className="grid h-8 w-8 place-items-center rounded-lg border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600"><FiTrash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td colSpan={4} className="px-5 py-16 text-center text-slate-400">No testimonials yet. Click "Add Testimonial" to create one.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <button onClick={() => setView("list")} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"><FiArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-2xl font-black text-slate-900">{editId ? "Edit Testimonial" : "New Testimonial"}</h1>
      </div>
      <div className="mt-6 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5">
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Client Name <span className="text-red-400">*</span></span>
            <input className={inputField} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Startup Founder" />
          </label>
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Role <span className="text-red-400">*</span></span>
            <input className={inputField} value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} placeholder="e.g. Product Client" />
          </label>
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Quote <span className="text-red-400">*</span></span>
            <textarea className={textareaField} rows={4} value={form.quote} onChange={e => setForm(p => ({ ...p, quote: e.target.value }))} placeholder="What did the client say?" />
          </label>
          <div className="flex gap-2 pt-2">
            <button onClick={submit} disabled={saving} className={`${btnPrimary} flex-1`}>{saving ? "Saving..." : <><FiSave className="h-4 w-4" /> {editId ? "Update Testimonial" : "Create Testimonial"}</>}</button>
            <button onClick={() => setView("list")} className={btnOutline}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────── Profile Panel ────────────── */
function ProfilePanel({ content, setContent, token, toast }) {
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState(content.profile?.stats || [{ label: "", value: "" }]);
  const [profile, setProfile] = useState(content.profile || {});

  useEffect(() => { setProfile(content.profile || {}); setStats(content.profile?.stats || [{ label: "", value: "" }]); }, [content.profile]);

  const updateField = (field, value) => setProfile(p => ({ ...p, [field]: value }));

  const updateStat = (idx, key, value) => {
    setStats(prev => prev.map((s, i) => i === idx ? { ...s, [key]: value } : s));
  };

  const addStat = () => setStats(prev => [...prev, { label: "", value: "" }]);
  const removeStat = (idx) => setStats(prev => prev.filter((_, i) => i !== idx));

  const save = async () => {
    setSaving(true);
    try {
      const heroCodeLines = typeof profile.heroCodeLines === "string" ? profile.heroCodeLines.split("\n").filter(Boolean) : profile.heroCodeLines;
      const updated = await apiRequest("/admin/profile", { method: "PUT", token, body: JSON.stringify({ ...profile, heroCodeLines, stats }) });
      setContent(p => ({ ...p, profile: updated }));
      toast({ title: "Profile saved." });
    } finally { setSaving(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-black text-slate-900">Profile</h1><p className="mt-1 text-slate-500">Manage site identity, headlines, and contact info.</p></div>
        <button onClick={save} disabled={saving} className={btnPrimary}><FiSave className="h-4 w-4" /> {saving ? "Saving..." : "Save Profile"}</button>
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {/* Identity */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">Identity</h3>
          <div className="grid gap-4">
            {[
              { field: "brand", label: "Brand Name", placeholder: "e.g. Technira.Space" },
              { field: "tagline", label: "Tagline", placeholder: "Hero tagline shown in pill badge" },
              { field: "email", label: "Email", placeholder: "support@technira.space" },
              { field: "phone", label: "Phone", placeholder: "+91 9876543210" },
              { field: "location", label: "Location", placeholder: "City, Country" },
            ].map(({ field, label, placeholder }) => (
              <label key={field} className="grid gap-1">
                <span className="text-xs font-semibold text-slate-600">{label}</span>
                <input className={inputField} value={profile[field] || ""} onChange={e => updateField(field, e.target.value)} placeholder={placeholder} />
              </label>
            ))}
          </div>
        </div>

        {/* Headlines & copy */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">Copy</h3>
          <div className="grid gap-4">
            {[
              { field: "headline", label: "Hero Headline", rows: 3, placeholder: "Main hero headline on homepage" },
              { field: "intro", label: "Hero Intro", rows: 3, placeholder: "Intro paragraph below headline" },
              { field: "aboutHeadline", label: "About Headline", rows: 2, placeholder: "Headline on about page" },
              { field: "aboutIntro", label: "About Intro", rows: 3, placeholder: "Intro paragraph on about page" },
              { field: "processTitle", label: "Process Title", rows: 1, placeholder: "From idea to launch build" },
              { field: "processSummary", label: "Process Summary", rows: 3, placeholder: "Process CTA description" },
            ].map(({ field, label, rows, placeholder }) => (
              <label key={field} className="grid gap-1">
                <span className="text-xs font-semibold text-slate-600">{label}</span>
                <textarea className={textareaField} rows={rows} value={profile[field] || ""} onChange={e => updateField(field, e.target.value)} placeholder={placeholder} />
              </label>
            ))}
          </div>
        </div>

        {/* Hero Code Lines */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">Hero Code Lines</h3>
          <textarea
            className={textareaField}
            rows={6}
            value={Array.isArray(profile.heroCodeLines) ? profile.heroCodeLines.join("\n") : profile.heroCodeLines || ""}
            onChange={e => updateField("heroCodeLines", e.target.value)}
            placeholder={'const studio = "portfolio + services";\nbuildWebApp();\npublishMobileApp();'}
          />
          <p className="mt-1 text-xs text-slate-400">One line per entry. Shown in the code terminal on hero/about sections.</p>
        </div>

        {/* URLs */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-slate-400">Links</h3>
          <div className="grid gap-4">
            {[
              { field: "playStoreUrl", label: "Play Store URL" },
              { field: "githubUrl", label: "GitHub URL" },
              { field: "linkedinUrl", label: "LinkedIn URL" },
            ].map(({ field, label }) => (
              <label key={field} className="grid gap-1">
                <span className="text-xs font-semibold text-slate-600">{label}</span>
                <input className={inputField} value={profile[field] || ""} onChange={e => updateField(field, e.target.value)} placeholder="https://" />
              </label>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Hero Stats</h3>
            <button onClick={addStat} className={`${btnOutline} text-xs px-3 py-1.5`}><FiPlus className="h-3 w-3" /> Add Stat</button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex-1 grid gap-2">
                  <input className={inputField} placeholder="Label" value={stat.label} onChange={e => updateStat(i, "label", e.target.value)} />
                  <input className={inputField} placeholder="Value" value={stat.value} onChange={e => updateStat(i, "value", e.target.value)} />
                </div>
                <button onClick={() => removeStat(i)} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500"><FiTrash2 className="h-3.5 w-3.5" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────── Leads ────────────── */
function LeadsPanel({ content, token, loadContent }) {
  const updateLead = async (leadId, status) => {
    await apiRequest(`/admin/leads/${leadId}`, { method: "PUT", token, body: JSON.stringify({ status }) });
    await loadContent();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-black text-slate-900">Leads</h1><p className="mt-1 text-slate-500">{content.leads?.length || 0} enquiries</p></div>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3 font-semibold text-slate-600">Name</th>
                <th className="px-5 py-3 font-semibold text-slate-600">Email</th>
                <th className="px-5 py-3 font-semibold text-slate-600">Phone</th>
                <th className="px-5 py-3 font-semibold text-slate-600">Message</th>
                <th className="px-5 py-3 font-semibold text-slate-600">Date</th>
                <th className="px-5 py-3 font-semibold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {content.leads?.map(lead => (
                <tr key={lead.id || lead._id} className="hover:bg-slate-50/50">
                  <td className="px-5 py-3 font-semibold text-slate-900">{lead.name}</td>
                  <td className="px-5 py-3 text-slate-600">{lead.email}</td>
                  <td className="px-5 py-3 text-slate-600">{lead.phone}</td>
                  <td className="max-w-xs truncate px-5 py-3 text-slate-600">{lead.message}</td>
                  <td className="px-5 py-3 text-xs text-slate-500">{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "—"}</td>
                  <td className="px-5 py-3">
                    <select value={lead.status || "new"} onChange={e => updateLead(lead.id || lead._id, e.target.value)} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 outline-none">
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
              {(!content.leads || content.leads.length === 0) && (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-400">No leads received yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ────────────── Orders ────────────── */
function OrdersPanel({ token }) {
  const toast = ({ title }) => window.alert(title);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => { const d = await apiRequest("/admin/orders", { token }); setOrders(Array.isArray(d) ? d : []); setLoading(false); };
  useEffect(() => { load().catch(e => toast({ title: e.message })); }, []);

  const updateStatus = async (id, status) => {
    const updated = await apiRequest(`/admin/orders/${id}`, { method: "PUT", token, body: JSON.stringify({ status }) });
    setOrders(prev => prev.map(o => o._id === id ? updated : o));
  };

  const statusColors = {
    requested: "bg-amber-100 text-amber-700 border-amber-200",
    confirmed: "bg-blue-100 text-blue-700 border-blue-200",
    "in-progress": "bg-purple-100 text-purple-700 border-purple-200",
    delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-black text-slate-900">Orders</h1><p className="mt-1 text-slate-500">{orders.length} total</p></div>
      </div>
      <div className="mt-6 grid gap-4">
        {loading && [0, 1, 2].map(i => <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6"><SkeletonBlock className="h-5 w-48" /><SkeletonBlock className="mt-2 h-4 w-72" /></div>)}
        {!loading && orders.length === 0 && <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-16 text-center text-slate-400">No orders yet.</div>}
        {orders.map(order => (
          <div key={order._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{order.projectName}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span>{order.serviceTitle}</span><span className="text-slate-300">|</span>
                  <span><FiUsers className="mr-1 inline h-3.5 w-3.5" />{order.user?.name || "Unknown"}</span>
                  <span className="text-slate-300">|</span><span>{order.user?.email}</span>
                </div>
                {order.description && <p className="mt-2 text-sm text-slate-600">{order.description}</p>}
                <p className="mt-2 text-xs text-slate-400">Created {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <select value={order.status} onChange={e => updateStatus(order._id, e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none">
                  <option value="requested">Requested</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <span className={`${pill} border ${statusColors[order.status] || "bg-slate-100 text-slate-600 border-slate-200"}`}>{order.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────── Custom Pages Manager ────────────── */
function CustomPagesManager({ token }) {
  const toast = ({ title }) => window.alert(title);
  const [items, setItems] = useState(null);
  const [view, setView] = useState("list");
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", content: "", type: "rich-text" });

  const load = async () => { setItems(await getCustomPages(token)); };
  useEffect(() => { load(); }, []);

  const resetForm = () => setForm({ title: "", slug: "", content: "", type: "rich-text" });
  const openCreate = () => { resetForm(); setEditId(null); setView("edit"); };
  const openEdit = (item) => {
    setForm({ title: item.title, slug: item.slug, content: item.content || "", type: item.type });
    setEditId(item._id);
    setView("edit");
  };

  const submit = async () => {
    if (!form.title.trim()) { toast({ title: "Title is required." }); return; }
    setSaving(true);
    try {
      if (editId) await updateCustomPage(editId, form, token);
      else await createCustomPage(form, token);
      await load();
      setView("list");
      toast({ title: editId ? "Page updated." : "Page created." });
    } catch (e) { toast({ title: e.message }); }
    finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this page permanently?")) return;
    try { await deleteCustomPage(id, token); await load(); toast({ title: "Deleted." }); }
    catch (e) { toast({ title: e.message }); }
  };

  const generateSlug = () => {
    if (!form.title) return;
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    setForm(p => ({ ...p, slug }));
  };

  if (!items) return <PageSkeleton cards={3} />;

  if (view === "list") {
    return (
      <div>
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-black text-slate-900">Pages</h1><p className="mt-1 text-slate-500">{items.length} custom pages</p></div>
          <button onClick={openCreate} className={btnPrimary}><FiPlus className="h-4 w-4" /> Create Page</button>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-5 py-3 font-semibold text-slate-600">Title</th>
                  <th className="px-5 py-3 font-semibold text-slate-600">Slug</th>
                  <th className="px-5 py-3 font-semibold text-slate-600">Type</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 hidden sm:table-cell">Updated</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 w-36">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {items.map(item => (
                  <tr key={item._id} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3.5 font-semibold text-slate-900">{item.title}</td>
                    <td className="px-5 py-3.5 text-slate-500">
                      <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono">/{item.slug}</code>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`${pill} ${item.type === "rich-text" ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600"}`}>
                        {item.type === "rich-text" ? "Rich Text" : "Plain Text"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-500 hidden sm:table-cell">
                      {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1">
                        <a href={`/p/${item.slug}`} target="_blank" rel="noreferrer" className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-slate-600" title="View"><FiExternalLink className="h-3.5 w-3.5" /></a>
                        <button onClick={() => openEdit(item)} className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700"><FiEdit3 className="h-3.5 w-3.5" /></button>
                        <button onClick={() => remove(item._id)} className="grid h-8 w-8 place-items-center rounded-lg border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600"><FiTrash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-16 text-center text-slate-400">No pages yet. Create one to add dynamic content to your site.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <button onClick={() => { setView("list"); resetForm(); }} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"><FiArrowLeft className="h-5 w-5" /></button>
        <h1 className="text-2xl font-black text-slate-900">{editId ? "Edit Page" : "New Page"}</h1>
      </div>
      <div className="mt-6 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5">
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Title <span className="text-red-400">*</span></span>
            <input className={inputField} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Privacy Policy" onBlur={() => { if (!editId && !form.slug) generateSlug(); }} />
          </label>
          <div>
            <label className="grid gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Slug / Path</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">/p/</span>
                <input className={`${inputField} flex-1`} value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} placeholder="privacy-policy" />
                <button type="button" onClick={generateSlug} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50">Generate</button>
              </div>
            </label>
            <p className="mt-1 text-xs text-slate-400">Page will be accessible at <code className="text-slate-600">/p/{form.slug || "..."}</code></p>
          </div>
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Content Type</span>
            <div className="flex gap-3">
              <label className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 transition ${form.type === "rich-text" ? "border-slate-400 bg-slate-50" : "border-slate-200"}`}>
                <input type="radio" name="contentType" checked={form.type === "rich-text"} onChange={() => setForm(p => ({ ...p, type: "rich-text" }))} className="h-4 w-4 accent-slate-900" />
                <span className="text-sm font-semibold text-slate-700">Rich Text</span>
              </label>
              <label className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 transition ${form.type === "plain-text" ? "border-slate-400 bg-slate-50" : "border-slate-200"}`}>
                <input type="radio" name="contentType" checked={form.type === "plain-text"} onChange={() => setForm(p => ({ ...p, type: "plain-text" }))} className="h-4 w-4 accent-slate-900" />
                <span className="text-sm font-semibold text-slate-700">Plain Text</span>
              </label>
            </div>
          </label>
          <label className="grid gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Content</span>
            {form.type === "rich-text" ? (
              <React.Suspense fallback={<div className="min-h-[300px] rounded-xl border border-slate-200 bg-slate-50 animate-pulse" />}>
                <RichTextEditor value={form.content} onChange={val => setForm(p => ({ ...p, content: val }))} placeholder="Write your page content..." />
              </React.Suspense>
            ) : (
              <textarea className={`${textareaField} font-mono`} rows={16} value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} placeholder="Write your page content in plain text..." spellCheck={false} />
            )}
          </label>
          <div className="flex gap-2 pt-2">
            <button onClick={submit} disabled={saving} className={`${btnPrimary} flex-1`}>{saving ? "Saving..." : <><FiSave className="h-4 w-4" /> {editId ? "Update Page" : "Create Page"}</>}</button>
            <button onClick={() => { setView("list"); resetForm(); }} className={btnOutline}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────── Site Files ────────────── */
function SiteFilesPanel({ content, setContent, token, toast }) {
  const [activeFile, setActiveFile] = useState("ads.txt");
  const [saving, setSaving] = useState(false);

  const endpoints = { "ads.txt": "/admin/ads-txt", "app-ads.txt": "/admin/app-ads-txt", "robots.txt": "/admin/robots-txt" };
  const contentKeys = { "ads.txt": "adsTxt", "app-ads.txt": "appAdsTxt", "robots.txt": "robotsTxt" };

  const saveFile = async () => {
    setSaving(true);
    try {
      const result = await apiRequest(endpoints[activeFile], { method: "PUT", token, body: JSON.stringify({ content: content[contentKeys[activeFile]]?.content || "" }) });
      setContent(p => ({ ...p, [contentKeys[activeFile]]: result }));
      toast({ title: `${activeFile} saved.` });
    } finally { setSaving(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-black text-slate-900">Site Files</h1><p className="mt-1 text-slate-500">Manage ads.txt, app-ads.txt, and robots.txt</p></div>
        <button onClick={saveFile} disabled={saving} className={btnPrimary}><FiSave className="h-4 w-4" /> {saving ? "Saving..." : "Save"}</button>
      </div>
      <div className="mt-6 flex gap-2">
        {["ads.txt", "app-ads.txt", "robots.txt"].map(file => (
          <button key={file} onClick={() => setActiveFile(file)} className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${activeFile === file ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600 hover:text-slate-900"}`}>
            <FiFileText className="mr-1.5 inline h-4 w-4" />{file}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <textarea
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          rows={20} spellCheck={false}
          value={content[contentKeys[activeFile]]?.content || ""}
          onChange={e => setContent(p => ({ ...p, [contentKeys[activeFile]]: { content: e.target.value } }))}
        />
      </div>
    </div>
  );
}

export default AdminPage;
