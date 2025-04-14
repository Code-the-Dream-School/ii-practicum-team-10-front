import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { LogInForm } from "./LogInForm";

interface FormErrors {
  email?: string;
  password?: string;
}

export const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_LOGIN_URL;

  const validate = (email: string, password: string): FormErrors => {
    const newErrors: FormErrors = {};
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) newErrors.email = "Please provide an email.";
    if (!trimmedPassword) newErrors.password = "Please provide a password.";

    return newErrors;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validate(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 401) {
          throw new Error("Invalid credentials. Please try again.");
        } else if (response.status === 400) {
          throw new Error(errorData.message || "Missing credentials.");
        } else {
          throw new Error("Something went wrong. Please try again later.");
        }
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);

      setEmail("");
      setPassword("");
      setErrors({});

      navigate("/dashboard");
    } catch (err: any) {
      setErrors({ email: err.message || "Unexpected error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LogInForm
      email={email}
      password={password}
      errors={errors}
      isSubmitting={isSubmitting}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
