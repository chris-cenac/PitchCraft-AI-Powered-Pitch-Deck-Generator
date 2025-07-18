import type { DeckSpec } from "@/components/Deck/slideTypes";

const BASE_URL = import.meta.env.NEST_API_URL || "http://localhost:3000";

export interface CreatePitchDeckPayload {
  businessData: Record<string, unknown>;
  componentsCatalog?: unknown[];
  slides?: unknown[];
  theme?: Record<string, unknown>;
}

export const createPitchDeck = async (data: CreatePitchDeckPayload) => {
  try {
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
        // If JSON parsing fails, try to get text from original response
        try {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        } catch {
          // If both fail, use the status text
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
      }

      throw new Error(errorMessage);
    }

    // Check if response has content
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const responseText = await response.text();
      console.error("Non-JSON response:", responseText);
      throw new Error("Server returned non-JSON response");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating pitch deck:", error);
    throw error;
  }
};

export const generatePitchDeck = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/pitch-decks/${id}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
  } catch (error) {
    console.error("Error generating pitch deck:", error);
    throw error;
  }
};

export const getGenerateStatus = async (id: string) => {
  try {
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
  } catch (error) {
    console.error("Error getting generation status:", error);
    throw error;
  }
};

export const getDeckById = async (id: string): Promise<DeckSpec> => {
  try {
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
  } catch (error) {
    console.error("Error fetching deck by ID:", error);
    throw error;
  }
};

export const getAllDecks = async () => {
  try {
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
  } catch (error) {
    console.error("Error fetching all decks:", error);
    throw error;
  }
};

// Helper function - replace with your actual auth token retrieval
const getAuthToken = () => {
  return localStorage.getItem("accessToken") || "";
};
