import type { DeckSpec } from "@/components/Deck/slideTypes";

const BASE_URL = import.meta.env.VITE_NEST_API_URL || "http://localhost:3000";

export interface CreatePitchDeckPayload {
  businessData: Record<string, unknown>;
  componentsCatalog?: unknown[];
  slides?: unknown[];
  theme?: Record<string, unknown>;
}

export const createPitchDeck = async (data: CreatePitchDeckPayload) => {
  const response = await fetch(`${BASE_URL}/pitch-decks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      // Clone the response to avoid consuming the stream
      const responseClone = response.clone();
      const errorData = await responseClone.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      try {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
    }
    throw new Error(errorMessage);
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Server returned non-JSON response");
  }
  return await response.json();
};

export const generatePitchDeck = async (id: string) => {
  const response = await fetch(`${BASE_URL}/pitch-decks/${id}/generate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const responseClone = response.clone();
      const errorData = await responseClone.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      try {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
    }
    throw new Error(errorMessage);
  }
  return await response.json();
};

export const getGenerateStatus = async (id: string) => {
  const response = await fetch(`${BASE_URL}/pitch-decks/${id}/status`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const responseClone = response.clone();
      const errorData = await responseClone.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      try {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
    }
    throw new Error(errorMessage);
  }
  const data = await response.json();
  return data.data || data;
};

export const getDeckById = async (id: string): Promise<DeckSpec> => {
  const response = await fetch(`${BASE_URL}/pitch-decks/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const responseClone = response.clone();
      const errorData = await responseClone.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      try {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
    }
    throw new Error(errorMessage);
  }
  const data = await response.json();
  // The backend returns { success, data: { spec: { slides, theme, ... } } }
  return data.data?.spec || data.data;
};

export const getAllDecks = async () => {
  const response = await fetch(`${BASE_URL}/pitch-decks`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const responseClone = response.clone();
      const errorData = await responseClone.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      try {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
    }
    throw new Error(errorMessage);
  }
  const data = await response.json();
  // The backend returns { success, data: [ ...decks ] }
  return data.data || [];
};

export const exportDeckPdf = async (html: string, filename = "deck.pdf") => {
  const response = await fetch(`${BASE_URL}/pitch-decks/pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({ html }),
  });
  if (!response.ok) {
    throw new Error("Failed to generate PDF");
  }
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, 100);
};

export const deleteDeck = async (id: string) => {
  const response = await fetch(`${BASE_URL}/pitch-decks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const responseClone = response.clone();
      const errorData = await responseClone.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      try {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
    }
    throw new Error(errorMessage);
  }
  return await response.json();
};

// Helper function - replace with your actual auth token retrieval
const getAuthToken = () => {
  return localStorage.getItem("accessToken") || "";
};
