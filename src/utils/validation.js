/**
 * Validation Helper Functions
 */

export const validateRequired = (value) => {
    if (!value || (typeof value === "string" && !value.trim())) {
        return "Campo obrigatório";
    }
    return "";
};

export const validateName = (value) => {
    if (!value || !value.trim()) return "Campo obrigatório";
    // Regex: Letters (including accented), spaces, dots, apostrophes
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s\.\']+$/.test(value)) {
        return "Apenas letras e espaços são permitidos";
    }
    if (value.trim().length < 3) {
        return "Nome muito curto";
    }
    return "";
};

export const validateEmail = (value) => {
    if (!value || !value.trim()) return "Campo obrigatório";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
        return "E-mail inválido";
    }
    return "";
};

export const validatePhone = (value) => {
    if (!value || !value.trim()) return "Campo obrigatório";
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length < 10) {
        return "Mínimo 10 dígitos (DDD + número)";
    }
    return "";
};

export const validateCNPJ = (value) => {
    // CNPJ is often optional, check logic in component or pass "required" flag?
    // We will assume if value exists, it must be valid. If it's required, validateRequired should be used too/instead.
    if (!value) return "";
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length < 14) {
        return "CNPJ incompleto (mínimo 14 dígitos)";
    }
    return "";
};

// Specialized for checkbox consent
export const validateChecked = (value) => {
    if (!value) return "É necessário aceitar os termos";
    return "";
};
