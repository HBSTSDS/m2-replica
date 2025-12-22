import { useState, useCallback } from "react";

/**
 * useForm Hook
 * @param {Object} initialValues - Initial state of the form fields
 * @param {Object} validationRules - Object mapping field names to validation functions
 */
export function useForm(initialValues, validationRules = {}) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    /**
     * Validate a single field
     */
    const validateField = useCallback((name, value) => {
        const rule = validationRules[name];
        if (rule) {
            return rule(value);
        }
        return "";
    }, [validationRules]);

    /**
     * Handle Change
     * Updates value and runs validation immediately (real-time feedback logic)
     * The requirement is: "While typing and correcting, error should disappear".
     */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;

        setValues((prev) => ({ ...prev, [name]: val }));

        const error = validateField(name, val);

        // Opt-in strategy: 
        // If there is an existing error, validate immediately to clear it if fixed.
        // If there is NO existing error, we can either validate immediately (aggressive) 
        // or wait for blur (lazy). 
        // User request: "Enquanto o usuário estiver digitando e corrigir o erro... deve desaparecer" -> implies immediate validation.

        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    /**
     * Handle Blur
     * Validate on blur to show errors when user leaves a field empty or invalid
     */
    const handleBlur = (e) => {
        const { name, value, type, checked } = e.target;
        // For checkbox, blur might not be main trigger, but let's keep consistency
        const val = type === "checkbox" ? checked : value;
        const error = validateField(name, val);
        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    /**
     * Validate All
     * Call this on submit. Returns true if valid.
     */
    const validateAll = () => {
        const newErrors = {};
        let isValid = true;

        Object.keys(values).forEach((key) => {
            // If the field exists in our rules, validate it
            if (validationRules[key]) {
                const error = validationRules[key](values[key]);
                if (error) {
                    newErrors[key] = error;
                    isValid = false;
                }
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
    };

    return {
        values,
        errors,
        handleChange,
        handleBlur,
        validateAll,
        resetForm,
        setValues, // Exposed if manual overrides needed
    };
}
