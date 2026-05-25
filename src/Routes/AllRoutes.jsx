import React from "react";
import { Route, Routes } from "react-router-dom";
import AboutPage from "../Pages/about/AboutPage";
import AdminPage from "../Pages/admin/AdminPage";
import Contact from "../Pages/contactus/Contact";
import HomePage from "../Pages/home/HomePage";
import Dashboard from "../Pages/portal/Dashboard";
import PortalAuth from "../Pages/portal/PortalAuth";
import ProjectsPage from "../Pages/projects/ProjectsPage";
import ServicesPage from "../Pages/services/ServicesPage";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/aboutus" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/portal" element={<PortalAuth />} />
      <Route path="/portal/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default AllRoutes;
