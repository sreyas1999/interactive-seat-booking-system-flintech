import { useState, useCallback } from 'react';

interface ValidationRules<T> {
  [K in keyof T]?: {
    required?: boolean;
    pattern?: RegExp;
    validate?: (value: T[K]) => boolean;
    errorMessage?: string;
  };
}

interface ValidationErrors<T> {
  [K in keyof T]?: string;
}

export const useFormValidation = <T extends Record<string, any>>(
  initialState: T,
  validationRules: ValidationRules<T>
) => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touched, setTouched] = useState<{ [K in keyof T]?: boolean }>({});

  const validateField = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      const rules = validationRules[name];
      if (!rules) return '';

      if (rules.required && !value) {
        return rules.errorMessage || 'This field is required';
      }

      if (rules.pattern && !rules.pattern.test(String(value))) {
        return rules.errorMessage || 'Invalid format';
      }

      if (rules.validate && !rules.validate(value)) {
        return rules.errorMessage || 'Invalid value';
      }

      return '';
    },
    [validationRules]
  );

  const handleChange = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    },
    [validateField]
  );

  const handleBlur = useCallback(
    (name: keyof T) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, values[name]),
      }));
    },
    [validateField, values]
  );

  const validateAll = useCallback(() => {
    const newErrors: ValidationErrors<T> = {};
    let isValid = true;

    Object.keys(validationRules).forEach((key) => {
      const error = validateField(key as keyof T, values[key as keyof T]);
      if (error) {
        newErrors[key as keyof T] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField, values, validationRules]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    setValues,
  };
};