import { Order } from "../models/index.js";

export async function getUserDashboard(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    const stats = {
      totalOrders: orders.length,
      activeOrders: orders.filter((order) => ["requested", "confirmed", "in-progress"].includes(order.status)).length,
      deliveredOrders: orders.filter((order) => order.status === "delivered").length,
    };

    res.json({ user: req.user, stats, orders });
  } catch (error) {
    next(error);
  }
}

export async function createOrder(req, res, next) {
  try {
    const { serviceTitle, projectName, description, amount, timeline } = req.body;
    if (!serviceTitle || !projectName) {
      return res.status(400).json({ message: "Service title and project name are required." });
    }

    const order = await Order.create({
      user: req.user._id,
      serviceTitle,
      projectName,
      description,
      amount,
      timeline,
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}
