import React, { useState, FormEvent } from "react";
import useAuth from "../../../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { LogInForm } from "./LogInForm";
interface FormErrors {
  email?: string;
  password?: string;
}

export const LogIn = () => {
  const { user, login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

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

    const validationErrors = validate(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      await login(email.trim(), password.trim());
      navigate("/dashboard"); // redirect after login
    } catch (err: any) {
      setErrors({ email: err.message || "Login failed. Please try again." });
    }
  };
  return (
    <LogInForm
      email={email}
      password={password}
      errors={errors}
      isSubmitting={isLoading}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

export default LogIn;
