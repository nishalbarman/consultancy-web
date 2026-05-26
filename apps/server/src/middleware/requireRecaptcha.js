import { verifyRecaptcha } from "../utils/recaptcha.js";

export function requireRecaptcha(req, res, next) {
  const token = req.body?.recaptcha || req.headers["x-recaptcha-token"];
  const skip = process.env.SKIP_RECAPTCHA === "true";
  
  if (skip) return next();

  verifyRecaptcha(token)
    .then((valid) => {
      if (valid) return next();
      res.status(400).json({ message: "reCAPTCHA verification failed. Please try again." });
    })
    .catch(() => {
      res.status(500).json({ message: "reCAPTCHA service unavailable." });
    });
}
