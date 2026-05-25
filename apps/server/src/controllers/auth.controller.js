import { User } from "../models/index.js";
import { signToken } from "../utils/token.js";

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
}

export async function registerUser(req, res, next) {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    const existing = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const user = await User.create({ name, email, phone, password });
    const token = signToken({ id: user._id, role: user.role });

    res.status(201).json({ token, user: publicUser(user) });
  } catch (error) {
    next(error);
  }
}

export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: String(email || "").toLowerCase().trim() }).select(
      "+password"
    );

    if (!user || !(await user.comparePassword(password || ""))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = signToken({ id: user._id, role: user.role });
    res.json({ token, user: publicUser(user) });
  } catch (error) {
    next(error);
  }
}

export function getMe(req, res) {
  res.json({ user: publicUser(req.user) });
}
