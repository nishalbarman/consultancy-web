import { AdsTxt, Lead, Profile, Project, RobotsTxt, Service, Testimonial } from "../models/index.js";

export async function readContent() {
  const [profile, services, projects, testimonials, leads, adsTxt, robotsTxt] = await Promise.all([
    Profile.findOne().lean({ virtuals: true }),
    Service.find().sort({ createdAt: 1 }).lean({ virtuals: true }),
    Project.find().sort({ createdAt: 1 }).lean({ virtuals: true }),
    Testimonial.find().sort({ createdAt: 1 }).lean({ virtuals: true }),
    Lead.find().sort({ createdAt: -1 }).lean({ virtuals: true }),
    AdsTxt.findOne().lean({ virtuals: true }),
    RobotsTxt.findOne().lean({ virtuals: true }),
  ]);

  return {
    profile,
    services,
    projects,
    testimonials,
    leads,
    adsTxt: adsTxt || { content: "" },
    robotsTxt: robotsTxt || { content: "" },
  };
}

export async function readAdsTxt() {
  const adsTxt = await AdsTxt.findOne().lean({ virtuals: true });
  return adsTxt?.content || "";
}

export async function readRobotsTxt() {
  const robotsTxt = await RobotsTxt.findOne().lean({ virtuals: true });
  return robotsTxt?.content || "";
}

export function publicSiteData(content) {
  return {
    profile: content.profile,
    services: content.services,
    projects: content.projects,
    testimonials: content.testimonials,
  };
}
