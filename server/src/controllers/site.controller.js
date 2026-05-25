import { publicSiteData, readContent } from "../services/content.service.js";

export async function getSiteContent(req, res, next) {
  try {
    const content = await readContent();
    res.json(publicSiteData(content));
  } catch (error) {
    next(error);
  }
}
