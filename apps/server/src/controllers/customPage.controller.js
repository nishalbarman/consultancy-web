import { CustomPage } from "../models/index.js";

export async function getCustomPages(req, res, next) {
  try {
    const pages = await CustomPage.find().sort({ createdAt: -1 });
    res.json(pages);
  } catch (error) {
    next(error);
  }
}

export async function createCustomPage(req, res, next) {
  try {
    const { title, content, type, slug } = req.body;

    let finalSlug = slug;
    if (!finalSlug && title) {
      finalSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    const existing = await CustomPage.findOne({ slug: finalSlug });
    if (existing) {
      return res.status(409).json({ message: `A page with slug "${finalSlug}" already exists.` });
    }

    const page = await CustomPage.create({ title, slug: finalSlug, content: content || "", type: type || "rich-text" });
    res.status(201).json(page);
  } catch (error) {
    next(error);
  }
}

export async function updateCustomPage(req, res, next) {
  try {
    const { title, content, type, slug } = req.body;

    let finalSlug = slug;
    if (!finalSlug && title) {
      finalSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    const existing = await CustomPage.findOne({ slug: finalSlug, _id: { $ne: req.params.id } });
    if (existing) {
      return res.status(409).json({ message: `A page with slug "${finalSlug}" already exists.` });
    }

    const page = await CustomPage.findByIdAndUpdate(
      req.params.id,
      { title, slug: finalSlug, content: content || "", type: type || "rich-text" },
      { new: true, runValidators: true }
    );

    if (!page) return res.status(404).json({ message: "Page not found." });
    res.json(page);
  } catch (error) {
    next(error);
  }
}

export async function deleteCustomPage(req, res, next) {
  try {
    const page = await CustomPage.findByIdAndDelete(req.params.id);
    if (!page) return res.status(404).json({ message: "Page not found." });
    res.json({ message: "Deleted", id: req.params.id });
  } catch (error) {
    next(error);
  }
}

export async function getPublicPage(req, res, next) {
  try {
    const page = await CustomPage.findOne({ slug: req.params.slug });
    if (!page) return res.status(404).json({ message: "Page not found." });
    res.json(page);
  } catch (error) {
    next(error);
  }
}
