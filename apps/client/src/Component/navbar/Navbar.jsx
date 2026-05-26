import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/aboutus" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
  { label: "Portal", to: "/portal" },
];

function Navbar({ transparent }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = transparent;
  const isActive = (to) => (to === "/" ? location.pathname === "/" : location.pathname.startsWith(to));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDarkNav = isHome;
  const headerBg = isDarkNav
    ? scrolled
      ? "bg-[#08090a]/90 backdrop-blur-xl border-b border-white/5"
      : "bg-transparent border-b border-transparent"
    : scrolled
      ? "bg-white/90 backdrop-blur-xl border-b border-slate-100"
      : "bg-white/90 backdrop-blur-2xl border-b border-slate-100";

  const logoColor = isDarkNav ? "text-white" : "text-slate-900";
  const linkDefault = isDarkNav
    ? "text-slate-400 hover:text-white hover:bg-white/5"
    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900";
  const linkActive = isDarkNav
    ? "bg-white/10 text-white"
    : "bg-slate-100 text-slate-900 shadow-sm";
  const ctaBase = isDarkNav
    ? "bg-white text-slate-900 hover:bg-slate-100 shadow-lg shadow-black/20"
    : "bg-slate-900 text-white hover:bg-slate-800 shadow-sm";

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerBg}`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="text-left" onClick={() => navigate("/")}>
          <span className={`block text-xl font-black tracking-tight ${logoColor}`}>Technira.Space</span>
        </motion.button>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${isActive(link.to) ? linkActive : linkDefault}`}>{link.label}</Link>
          ))}
        </div>
        <Link to="/contact" className={`hidden items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-all duration-300 lg:inline-flex ${ctaBase}`}>Book a Call</Link>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className={`grid h-11 w-11 place-items-center rounded-xl border lg:hidden ${isDarkNav ? "border-white/20 text-white" : "border-slate-200 text-slate-800 shadow-sm"}`}
          onClick={() => setOpen(true)} aria-label="Open menu"><FiMenu className="h-5 w-5" /></motion.button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)}>
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="glass ml-auto flex h-full w-80 max-w-[88vw] flex-col gap-2 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="mb-6 flex items-center justify-between">
                <div><strong className="block text-lg font-black text-slate-900">Technira.Space</strong><span className="text-xs font-black uppercase tracking-widest text-slate-400">Menu</span></div>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-600" onClick={() => setOpen(false)}><FiX /></motion.button>
              </div>
              {links.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 font-bold transition-all ${isActive(link.to) ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>{link.label}</Link>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)} className="mt-3 rounded-2xl bg-slate-900 px-5 py-3 text-center text-sm font-bold text-white">Book a Call</Link>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
