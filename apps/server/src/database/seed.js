import { AdminUser, Profile, Project, Service, Testimonial } from "../models/index.js";
import { adminConfig } from "../config/auth.js";
import { seedContent } from "./seedData.js";

export async function seedIfEmpty() {
  const [profileCount, serviceCount, projectCount, testimonialCount] = await Promise.all([
    Profile.countDocuments(),
    Service.countDocuments(),
    Project.countDocuments(),
    Testimonial.countDocuments(),
  ]);

  if (!profileCount) await Profile.create(seedContent.profile);
  if (!serviceCount) await Service.insertMany(seedContent.services);
  if (!projectCount) await Project.insertMany(seedContent.projects);
  if (!testimonialCount) await Testimonial.insertMany(seedContent.testimonials);

  // const admin = await AdminUser.findOne({ email: adminConfig.email });
  // if (!admin) {
  //   await AdminUser.create({
  //     name: "Technira Admin",
  //     email: adminConfig.email,
  //     password: adminConfig.password,
  //   });
  // }
}
