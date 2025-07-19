import { toast } from "react-hot-toast";

export interface AuthError {
  status: number;
  message: string;
  isAuthError: boolean;
}

export const handleAuthError = (
  status: number,
  message?: string
): AuthError => {
  // Clear expired tokens
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  if (status === 401) {
    const userMessage = "Your session has expired. Please log in again.";
    toast.error(userMessage);

    // Redirect to login after a short delay
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);

    return {
      status,
      message: userMessage,
      isAuthError: true,
    };
  }

  return {
    status,
    message: message || "An error occurred. Please try again.",
    isAuthError: false,
  };
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch {
    return true; // If we can't parse the token, assume it's expired
  }
};

export const checkAuthStatus = (): boolean => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return false;
  }

  if (isTokenExpired(token)) {
    handleAuthError(401);
    return false;
  }

  return true;
};
