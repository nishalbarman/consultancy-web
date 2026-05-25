import React, { useState } from "react";
import { ImSpinner10 } from "react-icons/im";
import { createLead } from "../../services/api";
import { theme } from "../../theme";

const inputClass =
  `w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-950 outline-none transition placeholder:text-slate-400 ${theme.focus}`;

function Contact() {
  const emailTester =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  const initialFormData = { name: "", message: "", email: "", phone: "" };
  const [formData, setFormData] = useState(initialFormData);
  const [sending, setSending] = useState(false);
  const toast = ({ title, description = "" }) => window.alert(`${title}${description ? `\n${description}` : ""}`);

  const sendMessage = async () => {
    const error = [];
    if (!formData.name || formData.name.length <= 2) error.push("Name must be at least 3 characters.");
    if (!formData.email || !emailTester.test(formData.email)) error.push("Email must be valid.");
    if (!formData.message || formData.message.length < 11) error.push("Message must be at least 10 characters.");
    if (!formData.phone || formData.phone.toString().length !== 10) error.push("Phone must be 10 digits.");

    if (error.length > 0) {
      toast({ title: "Validation failed", description: error.join(" "), status: "error", duration: 9000, isClosable: true, position: "top" });
      return;
    }

    try {
      setSending(true);
      await createLead(formData);
      setFormData(initialFormData);
      toast({ title: "Message submitted!", description: "Your message has been sent. We will get back to you before 48 hours.", status: "success", duration: 9000, isClosable: true, position: "top" });
    } catch (err) {
      toast({ title: "Message sent failed!", status: "warning", duration: 9000, isClosable: true, position: "top" });
    } finally {
      setSending(false);
    }
  };

  const handleInputChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <main className="bg-slate-50 pt-20 text-slate-950">
      <section className="relative isolate overflow-hidden bg-slate-950 px-5 py-24 text-white sm:px-8">
        <div className={`absolute inset-0 -z-10 ${theme.contactWash} bg-cover bg-center`} />
        <div className="mx-auto max-w-7xl">
          <span className={`rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold ${theme.textPale}`}>Contact</span>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">Let us code your vision</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            Share your app, website, API, or admin-panel requirement and we will turn it into a practical build plan.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
        <aside className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black">Project-ready conversations</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Tell us what you are building, what stage you are in, and where you need help. We can support planning, frontend, backend, admin, and launch.
          </p>
          <div className="mt-8 grid gap-4">
            {["Web apps and landing pages", "Mobile apps and Play Store builds", "APIs, dashboards, and client portals"].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 font-bold text-slate-700">{item}</div>
            ))}
          </div>
        </aside>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <input className={inputClass} onChange={handleInputChange} type="text" name="name" placeholder="Name*" value={formData.name} />
            <input className={inputClass} onChange={handleInputChange} type="email" name="email" placeholder="Email*" value={formData.email} />
          </div>
          <input className={`${inputClass} mt-4`} onChange={handleInputChange} type="tel" name="phone" maxLength={10} placeholder="Phone Number" value={formData.phone} />
          <textarea className={`${inputClass} mt-4 min-h-40 resize-y`} onChange={handleInputChange} name="message" placeholder="Message*" value={formData.message} />
          <button
            onClick={sendMessage}
            className={`mt-5 inline-flex w-full items-center justify-center gap-3 rounded-2xl ${theme.bg} px-6 py-4 font-black text-white shadow-lg ${theme.shadow} transition ${theme.bgHover} disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto`}
            disabled={sending}>
            Reach Us {sending && <ImSpinner10 className="animate-spin" />}
          </button>
        </section>
      </section>
    </main>
  );
}

export default Contact;
