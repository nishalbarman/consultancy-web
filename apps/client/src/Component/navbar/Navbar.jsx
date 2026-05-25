import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { theme } from "../../theme";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/aboutus" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
  { label: "Portal", to: "/portal" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (to) => (to === "/" ? location.pathname === "/" : location.pathname.startsWith(to));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <button className="text-left" onClick={() => navigate("/")}>
          <span className="block text-xl font-black tracking-normal text-slate-950">Technira.Space</span>
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                isActive(link.to)
                  ? `${theme.bgPale} ${theme.text}`
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}>
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          to="/contact"
          className={`hidden rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition ${theme.bgHover} lg:inline-flex`}>
          Book a Call
        </Link>

        <button
          className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 text-slate-950 lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu">
          <FiMenu />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)}>
          <aside
            className="ml-auto flex h-full w-80 max-w-[88vw] flex-col gap-2 bg-white p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <strong className="block text-lg font-black">Technira.Space</strong>
                <span className={`text-xs font-bold uppercase tracking-widest ${theme.text}`}>Menu</span>
              </div>
              <button className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100" onClick={() => setOpen(false)} aria-label="Close menu">
                <FiX />
              </button>
            </div>
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-3 font-bold ${
                  isActive(link.to) ? `${theme.bgPale} ${theme.text}` : "text-slate-700 hover:bg-slate-100"
                }`}>
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-xl bg-slate-950 px-5 py-3 text-center text-sm font-black text-white">
              Book a Call
            </Link>
          </aside>
        </div>
      )}
    </header>
  );
}

export default Navbar;
