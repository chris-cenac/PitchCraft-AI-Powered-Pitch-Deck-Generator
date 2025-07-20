// src/api/auth.ts
import { handleAuthError } from "@/utils/authInterceptor";

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

// Enhanced error handling with retry logic
async function handleResponse(res: Response, retries = 0): Promise<unknown> {
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
        // For auth endpoints, show specific login-related messages
        if (
          res.url.includes("/auth/login") ||
          res.url.includes("/auth/signup")
        ) {
          throw new Error(
            payload.message ||
              "Authentication failed. Please check your credentials."
          );
        } else {
          // For other endpoints, handle as session expiration
          const authError = handleAuthError(res.status, payload.message);
          throw new Error(authError.message);
        }
      case 409:
        throw new Error(
          payload.message || "User already exists with this email address."
        );
      case 422:
        throw new Error(
          payload.message || "Validation error. Please check your input."
        );
      case 429:
        if (retries < 3) {
          // Retry with exponential backoff
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, retries) * 1000)
          );
          // Note: We can't retry with the same request due to Response limitations
          // In a real implementation, you'd need to store the original request details
          throw new Error("Too many requests. Please try again later.");
        }
        throw new Error("Too many requests. Please try again later.");
      case 500:
        throw new Error(
          payload.message || "Server error. Please try again later."
        );
      case 503:
        throw new Error(
          "Service temporarily unavailable. Please try again later."
        );
      default:
        throw new Error(
          payload.message || `Request failed with status ${res.status}`
        );
    }
  }
  return res.json();
}

// Enhanced fetch wrapper with timeout
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout = 10000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout. Please try again.");
    }
    throw error;
  }
}

export async function signup(data: SignupDto) {
  return fetchWithTimeout(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export async function login(data: LoginDto) {
  return fetchWithTimeout(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export async function logout(data: LogoutDto) {
  const accessToken = localStorage.getItem("accessToken");

  return fetchWithTimeout(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then(handleResponse);
}
