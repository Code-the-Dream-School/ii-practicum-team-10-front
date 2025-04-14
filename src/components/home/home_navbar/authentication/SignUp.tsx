import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom"; 
import { SignUpForm } from "./SignUpForm";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmedPassword?: string;
}

export const SignUp = () => {
  const [user, setUser] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();

  const url = import.meta.env.VITE_API_SIGNUP_URL;

// Fields validation
  const validate = (
    name: string,
    email: string,
    password: string,
    confirmedPassword: string
  ): FormErrors => {
    const newErrors: FormErrors = {};
  
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmedPassword = confirmedPassword.trim();
  
    if (!trimmedName) newErrors.name = "Please provide a name";
    else if (trimmedName.length < 3) newErrors.name = "Name must be at least 3 characters long";
    else if (trimmedName.length > 50) newErrors.name = "Name cannot be longer than 50 characters";
  
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!trimmedEmail) newErrors.email = "Please provide an email";
    else if (!emailRegex.test(trimmedEmail)) newErrors.email = "Please provide a valid email";
  
    if (!trimmedPassword) newErrors.password = "Please provide a password";
    else if (trimmedPassword.length < 6) newErrors.password = "Password must be at least 6 characters long";
  
    if (!trimmedConfirmedPassword) newErrors.confirmedPassword = "Please confirm your password";
    else if (trimmedPassword !== trimmedConfirmedPassword)
      newErrors.confirmedPassword = "Passwords do not match";
  
    return newErrors;
  };

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validate(user, email, password, confirmedPassword);
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
          name: user.trim(),
          email: email.trim(),
          password: password.trim(),
          verifyPassword: confirmedPassword.trim(),
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "An error occurred");
      }
      
      const data = await response.json();

      setUser("");
      setEmail("");
      setPassword("");
      setConfirmedPassword("");
      setErrors({});

      setTimeout(() => {
        navigate("/login"); 
      }, 2000);

    } catch (err:any) {
      setErrors({ ...errors, email: err.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SignUpForm
      user={user}
      email={email}
      password={password}
      confirmedPassword={confirmedPassword}
      errors={errors}
      isSubmitting={isSubmitting}
      setUser={setUser}
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmedPassword={setConfirmedPassword}
      handleSubmit={handleSignUp}
    />
  );
};
