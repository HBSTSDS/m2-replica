import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

// TEST SITE KEY for Google reCAPTCHA v2 (Checkbox)
// Works on localhost and any domain for testing purposes.
// REPLACE WITH YOUR OWN KEY IN PRODUCTION: https://www.google.com/recaptcha/admin
const SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

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
    }
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
