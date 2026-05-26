import { Project, Service, Testimonial } from "../models/index.js";
import { makeId } from "../utils/makeId.js";

const editableModels = {
  services: Service,
  projects: Project,
  testimonials: Testimonial,
};

export async function createItem(req, res, next) {
  try {
    const Model = editableModels[req.params.collection];
    if (!Model) return res.status(400).json({ message: "Invalid collection." });

    const item = { ...req.body, id: makeId(req.body.title || req.body.name) };
    const created = await Model.create(item);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
}

export async function updateItem(req, res, next) {
  try {
    const Model = editableModels[req.params.collection];
    if (!Model) return res.status(400).json({ message: "Invalid collection." });

    const updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: "Item not found." });
    res.json(updated);
  } catch (error) {
    next(error);
  }
}

export async function deleteItem(req, res, next) {
  try {
    const Model = editableModels[req.params.collection];
    if (!Model) return res.status(400).json({ message: "Invalid collection." });

    const deleted = await Model.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item not found." });
    res.json({ message: "Deleted", id: req.params.id });
  } catch (error) {
    next(error);
  }
}

export async function getCollectionItems(req, res, next) {
  try {
    const Model = editableModels[req.params.collection];
    if (!Model) return res.status(400).json({ message: "Invalid collection." });

    const items = await Model.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
}
