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

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function handleResponse(res: Response) {
  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error(payload.message || "API error");
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
