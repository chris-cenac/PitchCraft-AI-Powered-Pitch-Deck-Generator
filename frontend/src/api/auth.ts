// src/api/auth.ts

export interface SignupDto {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LogoutDto {
  refreshToken: string;
}

const BASE_URL = import.meta.env.VITE_NEST_API_URL || "http://localhost:3000";

async function handleResponse(res: Response) {
  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));

    // Handle validation errors with array of messages
    if (payload.message && Array.isArray(payload.message)) {
      throw new Error(payload.message.join(", "));
    }

    // Handle specific HTTP status codes
    switch (res.status) {
      case 400:
        throw new Error(
          payload.message || "Invalid request data. Please check your input."
        );
      case 401:
        throw new Error(
          payload.message ||
            "Authentication failed. Please check your credentials."
        );
      case 409:
        throw new Error(
          payload.message || "User already exists with this email address."
        );
      case 422:
        throw new Error(
          payload.message || "Validation error. Please check your input."
        );
      case 500:
        throw new Error(
          payload.message || "Server error. Please try again later."
        );
      default:
        throw new Error(
          payload.message || `Request failed with status ${res.status}`
        );
    }
  }
  return res.json();
}

export async function signup(data: SignupDto) {
  return fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export async function login(data: LoginDto) {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export async function logout(data: LogoutDto) {
  const accessToken = localStorage.getItem("accessToken");

  return fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(handleResponse);
}
