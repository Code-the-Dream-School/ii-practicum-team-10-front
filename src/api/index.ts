import axios, { AxiosInstance } from "axios"
class Api {
  private baseUrl: string
  private apiClient: AxiosInstance

  constructor() {
    this.baseUrl = "https://ii-practicum-team-10-back.onrender.com/api/v1"
    this.apiClient = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      withXSRFToken: true,
    })
  }

  login = async (email: string, password: string) => {
    const response = await this.apiClient
      .post("/auth/login", {
        email: email.toLowerCase(),
        password: password.toLowerCase(),
      })
      .catch(function (err) {
        if (err.response) {
          return {
            status: err.response.status,
            message: err.response.message,
          }
        }
      })
    return response
  }

  register = async (name: string, email:string, password:string, verifyPassword:string) => {
    const response = await this.apiClient.post("/auth/register/user", {
      name,
      email,
      password,
      verifyPassword,
    })
    return response
  }
}

export default new Api()