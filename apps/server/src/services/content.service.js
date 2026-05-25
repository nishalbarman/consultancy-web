import { Lead, Profile, Project, Service, Testimonial } from "../models/index.js";

export async function readContent() {
  const [profile, services, projects, testimonials, leads] = await Promise.all([
    Profile.findOne().lean({ virtuals: true }),
    Service.find().sort({ createdAt: 1 }).lean({ virtuals: true }),
    Project.find().sort({ createdAt: 1 }).lean({ virtuals: true }),
    Testimonial.find().sort({ createdAt: 1 }).lean({ virtuals: true }),
    Lead.find().sort({ createdAt: -1 }).lean({ virtuals: true }),
  ]);

  return { profile, services, projects, testimonials, leads };
}

export function publicSiteData(content) {
  return {
    profile: content.profile,
    services: content.services,
    projects: content.projects,
    testimonials: content.testimonials,
  };
}
