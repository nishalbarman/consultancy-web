import { publicSiteData, readAdsTxt, readContent, readRobotsTxt } from "../services/content.service.js";

export async function getSiteContent(req, res, next) {
  try {
    const content = await readContent();
    res.json(publicSiteData(content));
  } catch (error) {
    next(error);
  }
}

export async function getAdsTxt(req, res, next) {
  try {
    const adsTxt = await readAdsTxt();
    res
      .type("text/plain")
      .set("Cache-Control", "public, max-age=300")
      .send(adsTxt);
  } catch (error) {
    next(error);
  }
}

export async function getRobotsTxt(req, res, next) {
  try {
    const robotsTxt = await readRobotsTxt();
    res
      .type("text/plain")
      .set("Cache-Control", "public, max-age=300")
      .send(robotsTxt);
  } catch (error) {
    next(error);
  }
}
