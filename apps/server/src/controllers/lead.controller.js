import { Lead } from "../models/index.js";

export async function createLead(req, res, next) {
  try {
    const { name, email, phone, message, service } = req.body;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "Name, email, phone, and message are required." });
    }

    const lead = await Lead.create({
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      service: String(service || "General enquiry").trim(),
      message: String(message).trim(),
    });

    res.status(200).json({ message: "Message received.", lead });
  } catch (error) {
    next(error);
  }
}
