import React, { useRef, forwardRef, useImperativeHandle } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const ReCaptchaWidget = forwardRef(function ReCaptchaWidget({ onChange }, ref) {
  const inner = useRef(null);
  useImperativeHandle(ref, () => ({
    reset: () => inner.current?.reset(),
  }));

  if (!SITE_KEY) return null;

  return <ReCAPTCHA ref={inner} sitekey={SITE_KEY} onChange={onChange} />;
});

export default ReCaptchaWidget;
