import React, { useEffect, useState } from "react";
import { FiFileText, FiPlus, FiSave, FiTrash2 } from "react-icons/fi";
import { PageSkeleton, SkeletonBlock } from "../../components/Skeleton";
import { apiRequest } from "../../services/api";
import { theme } from "../../theme";

const emptyService = {
  title: "New Service",
  summary: "Describe the service.",
  price: "From INR 10,000",
  features: ["Feature one"],
};

const emptyProject = {
  title: "New Project",
  type: "Web App",
  summary: "Describe the project.",
  stack: ["React"],
  url: "",
  playStoreUrl: "",
  featured: false,
};

const emptyTestimonial = {
  name: "Client Name",
  role: "Client",
  quote: "Client feedback goes here.",
};

const pageClass =
  "min-h-screen bg-slate-50 px-5 pt-28 pb-16 text-slate-950 sm:px-8 lg:px-10";
const panelClass = "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm";
const fieldClass = `w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none ${theme.focus}`;
const buttonClass = `inline-flex items-center justify-center gap-2 rounded-2xl ${theme.bg} px-5 py-3 font-black text-white ${theme.bgHover} disabled:opacity-60`;
const outlineButtonClass = `inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 font-black text-slate-700 ${theme.borderHover} ${theme.textHover}`;

function Badge({ children }) {
  return (
    <span
      className={`w-fit rounded-full ${theme.bgSoft} px-3 py-1 text-xs font-black uppercase tracking-widest ${theme.text}`}>
      {children}
    </span>
  );
}

function Button({
  children,
  onClick,
  isLoading,
  leftIcon,
  variant,
  colorScheme,
  ...props
}) {
  return (
    <button
      className={
        variant === "outline" || colorScheme === "red"
          ? outlineButtonClass
          : buttonClass
      }
      onClick={onClick}
      disabled={isLoading}
      {...props}>
      {leftIcon}
      {isLoading ? "Saving..." : children}
    </button>
  );
}

function Input(props) {
  return <input className={fieldClass} {...props} />;
}

function Textarea({ minH, ...props }) {
  return (
    <textarea
      className={`${fieldClass} min-h-28`}
      style={minH ? { minHeight: minH } : undefined}
      {...props}
    />
  );
}

function Select(props) {
  return <select className={fieldClass} {...props} />;
}

function FormControl({ children }) {
  return <label className="grid gap-2">{children}</label>;
}

function FormLabel({ children }) {
  return (
    <span className="text-sm font-black capitalize text-slate-700">
      {children}
    </span>
  );
}

function AdminPage() {
  const toast = ({ title }) => window.alert(title);
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [content, setContent] = useState(null);
  const [active, setActive] = useState("services");
  const [saving, setSaving] = useState(false);

  const loadContent = async (adminToken = token) => {
    const data = await apiRequest("/admin/content", { token: adminToken });
    setContent(data);
  };

  useEffect(() => {
    if (token) {
      loadContent().catch(() => {
        localStorage.removeItem("adminToken");
        setToken("");
      });
    }
  }, [token]);

  const login = async () => {
    const data = await apiRequest("/admin/login", {
      method: "POST",
      body: JSON.stringify({ email: adminEmail, password }),
    });
    localStorage.setItem("adminToken", data.token);
    setToken(data.token);
    setPassword("");
  };

  const updateCollectionItem = (collection, index, key, value) => {
    setContent((prev) => ({
      ...prev,
      [collection]: prev[collection].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      ),
    }));
  };

  const addItem = (collection) => {
    const template = {
      services: emptyService,
      projects: emptyProject,
      testimonials: emptyTestimonial,
    }[collection];
    setContent((prev) => ({
      ...prev,
      [collection]: [...prev[collection], template],
    }));
  };

  const removeItem = (collection, index) => {
    setContent((prev) => ({
      ...prev,
      [collection]: prev[collection]?.filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));
  };

  const saveCollection = async (collection) => {
    setSaving(true);
    try {
      const payload = content[collection].map((item) => ({
        ...Object.fromEntries(
          Object.entries(item)?.filter(
            ([key]) => !["_id", "createdAt", "updatedAt"].includes(key),
          ),
        ),
        features:
          typeof item.features === "string"
            ? item.features
                ?.split(",")
                ?.map((entry) => entry.trim())
                ?.filter(Boolean)
            : item.features,
        stack:
          typeof item.stack === "string"
            ? item.stack
                .split(",")
                .map((entry) => entry.trim())
                .filter(Boolean)
            : item.stack,
      }));
      const updated = await apiRequest(`/admin/${collection}`, {
        method: "PUT",
        token,
        body: JSON.stringify(payload),
      });
      setContent((prev) => ({ ...prev, [collection]: updated }));
      toast({ title: "Saved", status: "success", position: "top" });
    } finally {
      setSaving(false);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const profile = await apiRequest("/admin/profile", {
        method: "PUT",
        token,
        body: JSON.stringify(content.profile),
      });
      setContent((prev) => ({ ...prev, profile }));
      toast({ title: "Profile saved", status: "success", position: "top" });
    } finally {
      setSaving(false);
    }
  };

  const saveAdsTxt = async () => {
    setSaving(true);
    try {
      const adsTxt = await apiRequest("/admin/ads-txt", {
        method: "PUT",
        token,
        body: JSON.stringify({ content: content.adsTxt?.content || "" }),
      });
      setContent((prev) => ({ ...prev, adsTxt }));
      toast({ title: "ads.txt saved", status: "success", position: "top" });
    } finally {
      setSaving(false);
    }
  };

  const saveRobotsTxt = async () => {
    setSaving(true);
    try {
      const robotsTxt = await apiRequest("/admin/robots-txt", {
        method: "PUT",
        token,
        body: JSON.stringify({ content: content.robotsTxt?.content || "" }),
      });
      setContent((prev) => ({ ...prev, robotsTxt }));
      toast({ title: "robots.txt saved", status: "success", position: "top" });
    } finally {
      setSaving(false);
    }
  };

  const updateLead = async (leadId, status) => {
    const leads = await apiRequest(`/admin/leads/${leadId}`, {
      method: "PUT",
      token,
      body: JSON.stringify({ status }),
    });
    setContent((prev) => ({ ...prev, leads }));
  };

  if (!token) {
    return (
      <main className={pageClass}>
        <section className={`${panelClass} mx-auto grid max-w-xl gap-4`}>
          <Badge colorScheme="twitter" width="fit-content">
            Admin
          </Badge>
          <h1>Manage portfolio and service content</h1>
          <p>
            Admin credentials are stored in MongoDB. The first admin is seeded
            from server env.
          </p>
          <Input
            type="email"
            placeholder="Admin email"
            value={adminEmail}
            onChange={(event) => setAdminEmail(event.target.value)}
          />
          <Input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button colorScheme="twitter" onClick={login}>
            Login
          </Button>
        </section>
      </main>
    );
  }

  if (!content) {
    return <PageSkeleton cards={4} />;
  }

  return (
    <main className={pageClass}>
      <section className="mx-auto flex max-w-7xl flex-col gap-4 rounded-3xl bg-slate-950 p-7 text-white shadow-2xl shadow-slate-950/15 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Badge colorScheme="twitter">Admin Panel</Badge>
          <h1>Technira.Space content manager</h1>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            localStorage.removeItem("adminToken");
            setToken("");
          }}>
          Logout
        </Button>
      </section>

      <nav className="mx-auto my-6 flex max-w-7xl flex-wrap gap-2">
        {[
          "profile",
          "ads.txt",
          "robots.txt",
          "services",
          "projects",
          "testimonials",
          "leads",
          "orders",
        ].map((tab) => (
          <button
            key={tab}
            className={`rounded-full px-4 py-2 text-sm font-black capitalize transition ${
              active === tab
                ? `${theme.bgSoft} ${theme.text}`
                : "border border-slate-200 bg-white text-slate-600 hover:text-slate-950"
            }`}
            onClick={() => setActive(tab)}>
            {tab}
          </button>
        ))}
      </nav>

      {active === "profile" && (
        <section className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          {[
            "brand",
            "tagline",
            "headline",
            "intro",
            "aboutHeadline",
            "aboutIntro",
            "processTitle",
            "processSummary",
            "heroCodeLines",
            "email",
            "phone",
            "location",
            "playStoreUrl",
            "githubUrl",
            "linkedinUrl",
          ].map((field) => (
            <FormControl key={field}>
              <FormLabel>{field}</FormLabel>
              <Textarea
                minH={
                  field === "intro" || field === "headline" ? "120px" : "48px"
                }
                value={
                  Array.isArray(content.profile[field])
                    ? content.profile[field].join("\n")
                    : content.profile[field] || ""
                }
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    profile: {
                      ...prev.profile,
                      [field]:
                        field === "heroCodeLines"
                          ? event.target.value.split(/\r?\n/).filter(Boolean)
                          : event.target.value,
                    },
                  }))
                }
              />
            </FormControl>
          ))}
          <Button
            colorScheme="twitter"
            onClick={saveProfile}
            isLoading={saving}>
            <FiSave /> Save profile
          </Button>
        </section>
      )}

      {active === "ads.txt" && (
        <section className="mx-auto grid max-w-7xl gap-5">
          <div
            className={`${panelClass} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}>
            <div className="grid gap-2">
              <h2>ads.txt</h2>
              <span className="text-sm font-semibold text-slate-500">
                Published at /ads.txt
              </span>
            </div>
            <Button
              colorScheme="twitter"
              leftIcon={<FiSave />}
              onClick={saveAdsTxt}
              isLoading={saving}>
              Save
            </Button>
          </div>
          <section className={panelClass}>
            <FormControl>
              <FormLabel>
                <span className="inline-flex items-center gap-2">
                  <FiFileText /> text document
                </span>
              </FormLabel>
              <Textarea
                minH="420px"
                spellCheck="false"
                value={content.adsTxt?.content || ""}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    adsTxt: {
                      ...(prev.adsTxt || {}),
                      content: event.target.value,
                    },
                  }))
                }
              />
            </FormControl>
          </section>
        </section>
      )}

      {active === "robots.txt" && (
        <section className="mx-auto grid max-w-7xl gap-5">
          <div
            className={`${panelClass} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}>
            <div className="grid gap-2">
              <h2>robots.txt</h2>
              <span className="text-sm font-semibold text-slate-500">
                Published at /robots.txt
              </span>
            </div>
            <Button
              colorScheme="twitter"
              leftIcon={<FiSave />}
              onClick={saveRobotsTxt}
              isLoading={saving}>
              Save
            </Button>
          </div>
          <section className={panelClass}>
            <FormControl>
              <FormLabel>
                <span className="inline-flex items-center gap-2">
                  <FiFileText /> text document
                </span>
              </FormLabel>
              <Textarea
                minH="420px"
                spellCheck="false"
                value={content.robotsTxt?.content || ""}
                onChange={(event) =>
                  setContent((prev) => ({
                    ...prev,
                    robotsTxt: {
                      ...(prev.robotsTxt || {}),
                      content: event.target.value,
                    },
                  }))
                }
              />
            </FormControl>
          </section>
        </section>
      )}

      {["services", "projects", "testimonials"].includes(active) && (
        <section className="mx-auto grid max-w-7xl gap-5">
          <div
            className={`${panelClass} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}>
            <h2>{active}</h2>
            <div>
              <Button leftIcon={<FiPlus />} onClick={() => addItem(active)}>
                Add
              </Button>
              <Button
                colorScheme="twitter"
                leftIcon={<FiSave />}
                onClick={() => saveCollection(active)}
                isLoading={saving}>
                Save
              </Button>
            </div>
          </div>

          {content[active].map((item, index) => (
            <article
              className={`${panelClass} grid gap-5 md:grid-cols-2`}
              key={`${active}-${index}`}>
              {Object.entries(item).map(([key, value]) => {
                if (["id", "_id", "createdAt", "updatedAt"].includes(key))
                  return null;
                if (typeof value === "boolean") {
                  return (
                    <FormControl key={key}>
                      <FormLabel>{key}</FormLabel>
                      <Select
                        value={String(value)}
                        onChange={(event) =>
                          updateCollectionItem(
                            active,
                            index,
                            key,
                            event.target.value === "true",
                          )
                        }>
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </Select>
                    </FormControl>
                  );
                }
                return (
                  <FormControl key={key}>
                    <FormLabel>{key}</FormLabel>
                    <Textarea
                      value={
                        Array.isArray(value) ? value.join(", ") : value || ""
                      }
                      onChange={(event) =>
                        updateCollectionItem(
                          active,
                          index,
                          key,
                          event.target.value,
                        )
                      }
                    />
                  </FormControl>
                );
              })}
              <Button
                variant="outline"
                colorScheme="red"
                leftIcon={<FiTrash2 />}
                onClick={() => removeItem(active, index)}>
                Remove
              </Button>
            </article>
          ))}
        </section>
      )}

      {active === "leads" && (
        <section className="mx-auto grid max-w-7xl gap-5">
          <div
            className={`${panelClass} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}>
            <h2>leads</h2>
            <Badge>{content.leads.length} enquiries</Badge>
          </div>
          {content.leads.map((lead) => (
            <article
              className={`${panelClass} flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between`}
              key={lead.id}>
              <div>
                <strong>{lead.name}</strong>
                <span>
                  {lead.email} | {lead.phone}
                </span>
                <p>{lead.message}</p>
                <small>{new Date(lead.createdAt).toLocaleString()}</small>
              </div>
              <Select
                value={lead.status}
                onChange={(event) => updateLead(lead.id, event.target.value)}>
                <option value="new">new</option>
                <option value="contacted">contacted</option>
                <option value="closed">closed</option>
              </Select>
            </article>
          ))}
        </section>
      )}

      {active === "orders" && <AdminOrders token={token} />}
    </main>
  );
}

function AdminOrders({ token }) {
  const toast = ({ title }) => window.alert(title);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    const data = await apiRequest("/admin/orders", { token });
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders().catch((error) =>
      toast({ title: error.message, status: "error" }),
    );
  }, []);

  const updateStatus = async (id, status) => {
    const updated = await apiRequest(`/admin/orders/${id}`, {
      method: "PUT",
      token,
      body: JSON.stringify({ status }),
    });
    setOrders((prev) =>
      prev.map((order) => (order._id === id ? updated : order)),
    );
  };

  return (
    <section className="mx-auto grid max-w-7xl gap-5">
      <div
        className={`${panelClass} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}>
        <h2>orders</h2>
        <Badge>{orders.length} orders</Badge>
      </div>
      {loading &&
        [0, 1].map((item) => (
          <div key={item} className={panelClass}>
            <SkeletonBlock className="h-6 w-56" />
            <SkeletonBlock className="mt-4 h-4 w-full max-w-xl" />
            <SkeletonBlock className="mt-3 h-4 w-80 max-w-full" />
          </div>
        ))}
      {orders.map((order) => (
        <article
          className={`${panelClass} flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between`}
          key={order._id}>
          <div>
            <strong>{order.projectName}</strong>
            <span>
              {order.serviceTitle} | {order.user?.name} | {order.user?.email}
            </span>
            <p>{order.description || "No description added."}</p>
            <small>{new Date(order.createdAt).toLocaleString()}</small>
          </div>
          <Select
            value={order.status}
            onChange={(event) => updateStatus(order._id, event.target.value)}>
            <option value="requested">requested</option>
            <option value="confirmed">confirmed</option>
            <option value="in-progress">in-progress</option>
            <option value="delivered">delivered</option>
            <option value="cancelled">cancelled</option>
          </Select>
        </article>
      ))}
    </section>
  );
}

export default AdminPage;
