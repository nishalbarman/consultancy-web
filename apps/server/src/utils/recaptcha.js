const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export async function verifyRecaptcha(token) {
  if (!RECAPTCHA_SECRET) {
    console.warn("RECAPTCHA_SECRET_KEY not set — skipping verification", RECAPTCHA_SECRET);
    return true;
  }

  if (!token) return false;

  try {
    const params = new URLSearchParams({ secret: RECAPTCHA_SECRET, response: token });
    const res = await fetch(VERIFY_URL, { method: "POST", body: params });
    const data = await res.json();
    return data.success === true && (data.score == null || data.score >= 0.3);
  } catch {
    return false;
  }
}
