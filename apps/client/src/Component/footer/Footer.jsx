import React from "react";
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

function Footer() {
  const handleTopScroll = () => {
    document.documentElement.scrollTop = 0;
  };

  return (
    <footer className="mt-20 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4 lg:px-10">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-black">Technira.Space</h2>
          <p className="mt-4 max-w-xl leading-7 text-slate-300">
            Developer portfolio and service studio for web apps, mobile apps, APIs, admin panels,
            client portals, and Play Store-ready product builds.
          </p>
        </div>
        <div>
          <h3 className="font-black">Quick Links</h3>
          <div className="mt-4 grid gap-3 text-slate-300">
            <Link className="hover:text-white" to="/projects">Projects</Link>
            <Link className="hover:text-white" to="/services">Services</Link>
            <Link className="hover:text-white" to="/portal">Client Portal</Link>
            <Link className="hover:text-white" to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="font-black">Contact</h3>
          <div className="mt-4 grid gap-3 text-slate-300">
            <a className="hover:text-white" href="mailto:support@technira.space">support@technira.space</a>
            <a className="hover:text-white" href="mailto:business@technira.space">business@technira.space</a>
          </div>
          <div className="mt-5 flex gap-2">
            {[FiMail, FiGithub, FiLinkedin].map((Icon, index) => (
              <button key={index} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-300 transition hover:bg-white hover:text-slate-950">
                <Icon />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>Copyrights @ {new Date().getFullYear()} Technira.Space. All rights reserved.</p>
          <button onClick={handleTopScroll} className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-bold text-white hover:bg-white/20">
            Top <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
