import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

// Production reCAPTCHA v2 (Checkbox) from .env
const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const Captcha = forwardRef((props, ref) => {
  const recaptchaRef = useRef(null);
  const [token, setToken] = useState("");

  useImperativeHandle(ref, () => ({
    refresh: () => {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setToken("");
      }
    },
    // Alias for semantics, though 'refresh' is what parents call
    reset: () => {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setToken("");
      }
    },
    getToken: () => token
  }));

  const handleChange = (value) => {
    setToken(value);
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={SITE_KEY}
        onChange={handleChange}
        hl="pt-BR"
      />
      {/* 
        This hidden input ensures FormData collects the token 
        with the name 'g-recaptcha-response' automatically.
      */}
      <input 
        type="hidden" 
        name="g-recaptcha-response" 
        value={token || ""} 
        required
      />
      {!token && (
        <span className="text-xs text-red-500 font-semibold" style={{ display: 'none' }}>
           Por favor, marque a caixa "Não sou um robô".
        </span>
      )}
    </div>
  );
});

Captcha.displayName = "Captcha";

export default Captcha;
