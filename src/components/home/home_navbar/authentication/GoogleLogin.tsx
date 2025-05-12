import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

declare global {
  interface Window {
    google?: any;
  }
}

export const GoogleLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [googleButtonLoaded, setGoogleButtonLoaded] = useState(false);
  const { setUser } = useAuth();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId || !window.google?.accounts?.id) {
        setError("Google Sign-In is not configured properly.");
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        auto_select: false,
      });

      const buttonDiv = document.getElementById("googleSignInButton");
      if (buttonDiv) {
        window.google.accounts.id.renderButton(buttonDiv, {
          theme: "outline",
          size: "large",
          text: "signin_with",
          width: 300,
          shape: "rectangular",
        });
        setGoogleButtonLoaded(true);
      } else {
        setError("Failed to render Google button.");
      }
    };

    script.onerror = () => setError("Failed to load Google Sign-In script.");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = async (response: any) => {
    try {
      const res = await axios.post(
        "https://ii-practicum-team-10-back.onrender.com/api/v1/auth/google/signin",
        { id_token: response.credential },
        { headers: { "Content-Type": "application/json" } }
      );
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Google Login Error:", error);
      setError("Google Sign-In failed. Please try again.");
      navigate("/auth/error");
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div id="googleSignInButton" />
      {!googleButtonLoaded && !error && (
        <p className="text-gray-500 mt-2">Loading Google Sign-In...</p>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};
