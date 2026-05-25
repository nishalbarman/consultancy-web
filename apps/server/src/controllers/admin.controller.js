import { AdsTxt, AdminUser, Lead, Order, Profile, Project, RobotsTxt, Service, Testimonial, User } from "../models/index.js";
import { readContent } from "../services/content.service.js";
import { signToken } from "../utils/token.js";
import { makeId } from "../utils/makeId.js";

const editableModels = {
  services: Service,
  projects: Project,
  testimonials: Testimonial,
};

export async function loginAdmin(req, res, next) {
  try {
    const { email, password } = req.body;
    const admin = await AdminUser.findOne({ email: String(email || "").toLowerCase().trim() }).select(
      "+password"
    );

    if (!admin || !(await admin.comparePassword(password || ""))) {
      return res.status(401).json({ message: "Invalid admin email or password." });
    }

    const token = signToken({ id: admin._id, role: admin.role });
    res.json({
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    next(error);
  }
}

export async function getAdminContent(req, res, next) {
  try {
    res.json(await readContent());
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
    res.json(profile);
  } catch (error) {
    next(error);
  }
}

export async function updateAdsTxt(req, res, next) {
  try {
    const adsTxt = await AdsTxt.findOneAndUpdate(
      {},
      { content: String(req.body?.content || "") },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );
    res.json(adsTxt);
  } catch (error) {
    next(error);
  }
}

export async function updateRobotsTxt(req, res, next) {
  try {
    const robotsTxt = await RobotsTxt.findOneAndUpdate(
      {},
      { content: String(req.body?.content || "") },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );
    res.json(robotsTxt);
  } catch (error) {
    next(error);
  }
}

export async function updateCollection(req, res, next) {
  try {
    const Model = editableModels[req.params.collection];
    if (!Model || !Array.isArray(req.body)) {
      return res.status(400).json({ message: "Invalid collection update." });
    }

    const normalized = req.body.map((item) => ({
      ...item,
      id: item.id || makeId(item.title || item.name),
    }));

    await Model.deleteMany({});
    const updated = normalized.length ? await Model.insertMany(normalized) : [];
    res.json(updated);
  } catch (error) {
    next(error);
  }
}

export async function updateLead(req, res, next) {
  try {
    await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    next(error);
  }
}

export async function getAdminOrders(req, res, next) {
  try {
    const orders = await Order.find().populate("user", "name email phone").sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

export async function updateOrder(req, res, next) {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(
      "user",
      "name email phone"
    );
    res.json(order);
  } catch (error) {
    next(error);
  }
}

export async function getAdminUsers(req, res, next) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
}
