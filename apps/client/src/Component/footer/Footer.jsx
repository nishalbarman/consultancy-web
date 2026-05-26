import React from "react";
import { FiArrowUp, FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const footerLinks = [
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/aboutus", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/portal", label: "Client Portal" },
];

const socialLinks = [
  { icon: FiMail, href: "mailto:support@technira.space", label: "Email" },
  { icon: FiGithub, href: "#", label: "GitHub" },
  { icon: FiLinkedin, href: "#", label: "LinkedIn" },
];

function Footer() {
  const handleTopScroll = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.04] bg-[#08090a] text-white">
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:px-10">
        <div className="flex flex-col items-start gap-6 rounded-3xl border border-white/[0.04] bg-white/[0.02] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-lg">
            <h2 className="text-xl font-black tracking-tight sm:text-2xl text-white">Ready to build something great?</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">Share your requirements and we'll turn them into a production-ready product.</p>
          </div>
          <Link to="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-[#08090a] shadow-lg shadow-black/30 transition hover:bg-neutral-100">Start a project <FiArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-12 pt-14 sm:px-8 md:grid-cols-12 lg:px-10">
        <div className="md:col-span-5">
          <Link to="/" className="inline-block text-2xl font-black tracking-tight text-white">Technira<span className="text-neutral-500">.Space</span></Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-400">Developer portfolio and service studio for web apps, mobile apps, APIs, admin panels, client portals, and Play Store-ready product builds.</p>
          <div className="mt-6 flex items-center gap-2 text-sm text-neutral-400"><FiMapPin className="h-4 w-4 shrink-0 text-neutral-600" /><span>Available for projects worldwide</span></div>
        </div>
        <div className="md:col-span-3">
          <h3 className="text-xs font-black uppercase tracking-widest text-neutral-500">Navigate</h3>
          <ul className="mt-5 grid gap-2.5">{footerLinks.map((link) => <li key={link.to}><Link to={link.to} className="text-sm font-medium text-neutral-400 transition hover:text-white">{link.label}</Link></li>)}</ul>
        </div>
        <div className="md:col-span-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-neutral-500">Contact</h3>
          <div className="mt-5 grid gap-2.5 text-sm font-medium text-neutral-400">
            <a href="mailto:support@technira.space" className="transition hover:text-white">support@technira.space</a>
            <a href="mailto:business@technira.space" className="transition hover:text-white">business@technira.space</a>
          </div>
          <div className="mt-5 flex gap-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a key={label} href={href} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" title={label}
                className="grid h-9 w-9 place-items-center rounded-xl border border-white/[0.04] bg-white/[0.02] text-neutral-400 transition hover:border-white/[0.08] hover:bg-white/[0.05] hover:text-white"><Icon className="h-4 w-4" /></motion.a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/[0.04]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-5 text-xs text-neutral-500 sm:flex-row sm:justify-between sm:px-8 lg:px-10">
          <p>&copy; {new Date().getFullYear()} Technira.Space. All rights reserved.</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleTopScroll}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.04] bg-white/[0.02] px-3.5 py-1.5 text-xs font-semibold text-neutral-400 transition hover:border-white/[0.08] hover:bg-white/[0.05] hover:text-white">Back to top <FiArrowUp className="h-3.5 w-3.5" /></motion.button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
