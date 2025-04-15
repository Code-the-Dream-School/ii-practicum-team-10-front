import axios, { AxiosInstance } from "axios";
class Api {
  private baseUrl: string;
  private apiClient: AxiosInstance;

  constructor() {
    this.baseUrl = "https://ii-practicum-team-10-back.onrender.com/api/v1";
    this.apiClient = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      withXSRFToken: true,
    });
  }

  login = async (email: string, password: string) => {
    try {
      const response = await this.apiClient.post("/auth/login", {
        email: email.toLowerCase(),
        password: password.toLowerCase(),
      });
      return response;
    } catch (err: any) {
      const status = err.response?.status || 500;
      const data = err.response?.data || {};

      let message = "Something went wrong.";

      if (status === 400 || (status === 401 && data.message)) {
        message = data.message;
      }

      throw new Error(`${status}: ${message} Please try again`);
    }
  };

  register = async (
    name: string,
    email: string,
    password: string,
    verifyPassword: string
  ) => {
    try {
      const response = await this.apiClient.post("/auth/register/user", {
        name,
        email,
        password,
        verifyPassword,
      });
      return response;
    } catch (err: any) {
      const status = err.response?.status || 500;
      const data = err.response?.data || {};

      let message = "Something went wrong.";
      if (status === 400) {
        message = data.message;
      }
      throw new Error(`${status}: ${message} Please try again`);
    }
  };
}

export default new Api();
