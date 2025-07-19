import type { DeckSpec } from "@/components/Deck/slideTypes";
import { handleAuthError } from "@/utils/authInterceptor";

const BASE_URL = import.meta.env.VITE_NEST_API_URL || "http://localhost:3000";

export interface CreatePitchDeckPayload {
  businessData?: Record<string, unknown>;
  template?: Record<string, unknown>;
  componentsCatalog?: unknown[];
  slides?: unknown[];
  theme?: Record<string, unknown>;
  title?: string;
  description?: string;
  deckType?: "ai-generated" | "template-based" | "custom";
  isTemplate?: boolean;
  parentDeckId?: string;
}

export interface Deck {
  _id?: string;
  id?: string;
  title?: string;
  description?: string;
  deckType?: string;
  isTemplate?: boolean;
  currentVersion?: number;
  versions?: Record<string, unknown>[];
  spec?: {
    businessData?: Record<string, unknown>;
    template?: Record<string, unknown>;
    slides?: unknown[];
    theme?: Record<string, unknown>;
  };
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VersionData {
  spec: Record<string, unknown>;
  description?: string;
}

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    // Handle authentication errors gracefully
    if (response.status === 401) {
      const authError = handleAuthError(response.status, errorData.message);
      throw new Error(authError.message);
    }

    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
};

// Get all decks with optional filtering
export const getAllDecks = async (options?: {
  deckType?: string;
  isTemplate?: boolean;
  limit?: number;
  skip?: number;
}): Promise<Deck[]> => {
  const params = new URLSearchParams();
  if (options?.deckType) params.append("deckType", options.deckType);
  if (options?.isTemplate !== undefined)
    params.append("isTemplate", options.isTemplate.toString());
  if (options?.limit) params.append("limit", options.limit.toString());
  if (options?.skip) params.append("skip", options.skip.toString());

  const url = `${BASE_URL}/pitch-decks${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const response = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const result = await handleResponse(response);
  return result.data || [];
};

// Get all templates
export const getAllTemplates = async (): Promise<Deck[]> => {
  const response = await fetch(`${BASE_URL}/pitch-decks/templates`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const result = await handleResponse(response);
  return result.data || [];
};

// Get user templates
export const getUserTemplates = async (): Promise<Deck[]> => {
  const response = await fetch(`${BASE_URL}/pitch-decks/my-templates`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const result = await handleResponse(response);
  return result.data || [];
};

// Create a new pitch deck
export const createPitchDeck = async (
  payload: CreatePitchDeckPayload
): Promise<Record<string, unknown>> => {
  const response = await fetch(`${BASE_URL}/pitch-decks`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

// Create a deck from template
export const createDeckFromTemplate = async (
  templateId: string,
  businessData?: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const response = await fetch(
    `${BASE_URL}/pitch-decks/from-template/${templateId}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ businessData }),
    }
  );

  return handleResponse(response);
};

// Get a specific deck
export const getDeck = async (id: string): Promise<Deck> => {
  const response = await fetch(`${BASE_URL}/pitch-decks/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const result = await handleResponse(response);
  return result.data;
};

// Update a deck
export const updateDeck = async (
  id: string,
  payload: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const response = await fetch(`${BASE_URL}/pitch-decks/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

// Delete a deck
export const deleteDeck = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/pitch-decks/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  await handleResponse(response);
};

// Create a new version
export const createVersion = async (
  id: string,
  versionData: VersionData
): Promise<Record<string, unknown>> => {
  const response = await fetch(`${BASE_URL}/pitch-decks/${id}/versions`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(versionData),
  });

  return handleResponse(response);
};

// Get a specific version
export const getVersion = async (
  id: string,
  version: number
): Promise<Record<string, unknown>> => {
  const response = await fetch(
    `${BASE_URL}/pitch-decks/${id}/versions/${version}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  const result = await handleResponse(response);
  return result.data;
};

// Revert to a specific version
export const revertToVersion = async (
  id: string,
  version: number
): Promise<Record<string, unknown>> => {
  const response = await fetch(
    `${BASE_URL}/pitch-decks/${id}/revert/${version}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
};

// Generate AI content for a deck
export const generateDeck = async (
  id: string
): Promise<Record<string, unknown>> => {
  const response = await fetch(`${BASE_URL}/pitch-decks/${id}/generate`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
};

// Legacy function for backward compatibility
export const generatePitchDeck = async (
  id: string
): Promise<Record<string, unknown>> => {
  return generateDeck(id);
};

// Get generation status
export const getGenerateStatus = async (
  id: string
): Promise<{
  status: string;
  percent: number;
  phase: number;
  error?: string;
}> => {
  const response = await fetch(`${BASE_URL}/pitch-decks/${id}/status`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const result = await handleResponse(response);
  return result.data || result;
};

// Legacy function for backward compatibility
export const getDeckById = async (id: string): Promise<DeckSpec> => {
  const response = await fetch(`${BASE_URL}/pitch-decks/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const result = await handleResponse(response);
  // The backend returns { success, data: { spec: { slides, theme, ... } } }
  return result.data?.spec || result.data;
};

// Export deck as PDF
export const exportDeckPdf = async (html: string, filename = "deck.pdf") => {
  const response = await fetch(`${BASE_URL}/pitch-decks/pdf`, {
    method: "POST",
    headers: getAuthHeaders(),
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
