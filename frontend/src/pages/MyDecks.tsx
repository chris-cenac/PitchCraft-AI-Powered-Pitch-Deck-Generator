import React, { useEffect, useState } from "react";
import { getAllDecks, deleteDeck } from "@/api/decks";
import { useNavigate } from "react-router-dom";
import { Button, ConfirmationModal } from "@/components/ui";
import { toast } from "react-hot-toast";
import { handleAuthError } from "@/utils/authInterceptor";
import {
  FiArrowLeft,
  FiEdit3,
  FiTrash2,
  FiEye,
  FiClock,
  FiTag,
} from "react-icons/fi";

interface Deck {
  _id?: string;
  id?: string;
  title?: string;
  description?: string;
  deckType?: string;
  isTemplate?: boolean;
  currentVersion?: number;
  versions?: Record<string, unknown>[];
  spec?: {
    businessData?: {
      companyName?: string;
      tagline?: string;
    };
    template?: {
      name?: string;
      category?: string;
    };
  };
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

const MyDecks: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    deckId: string | null;
    deckTitle: string;
    isLoading: boolean;
  }>({
    isOpen: false,
    deckId: null,
    deckTitle: "",
    isLoading: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecks = async () => {
      // Check if user is authenticated
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("Please log in to view your decks");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await getAllDecks();
        setDecks(data);
      } catch (err: unknown) {
        if (err instanceof Error && err.message.includes("401")) {
          // Use the auth interceptor for consistent handling
          handleAuthError(401);
          setError("Session expired. Please log in again.");
        } else {
          setError(
            err instanceof Error ? err.message : "Failed to fetch decks"
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDecks();
  }, []);

  const handleDeleteClick = (deckId: string, deckTitle: string) => {
    setDeleteModal({
      isOpen: true,
      deckId,
      deckTitle,
      isLoading: false,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.deckId) return;

    setDeleteModal((prev) => ({ ...prev, isLoading: true }));

    try {
      await deleteDeck(deleteModal.deckId);
      toast.success("Deck deleted successfully!");
      setDecks((prev) =>
        prev.filter(
          (d) => d._id !== deleteModal.deckId && d.id !== deleteModal.deckId
        )
      );
      setDeleteModal({
        isOpen: false,
        deckId: null,
        deckTitle: "",
        isLoading: false,
      });
    } catch {
      toast.error("Failed to delete deck. Please try again.");
      setDeleteModal((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({
      isOpen: false,
      deckId: null,
      deckTitle: "",
      isLoading: false,
    });
  };

  const getDeckTitle = (deck: Deck) => {
    return (
      deck.title ||
      deck.spec?.businessData?.companyName ||
      deck.spec?.template?.name ||
      "Untitled Deck"
    );
  };

  const getDeckDescription = (deck: Deck) => {
    return (
      deck.description ||
      deck.spec?.businessData?.tagline ||
      "No description available"
    );
  };

  const getDeckTypeLabel = (deckType?: string) => {
    switch (deckType) {
      case "ai-generated":
        return {
          label: "AI Generated",
          color:
            "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
        };
      case "template-based":
        return {
          label: "Template Based",
          color:
            "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
        };
      case "custom":
        return {
          label: "Custom",
          color:
            "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
        };
      default:
        return {
          label: "Unknown",
          color:
            "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
        };
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredDecks = decks.filter((deck) => {
    if (filter === "all") return true;
    if (filter === "templates") return deck.isTemplate;
    if (filter === "generated")
      return (
        deck.deckType === "ai-generated" || deck.deckType === "template-based"
      );
    if (filter === "custom") return deck.deckType === "custom";
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary dark:border-accent mx-auto mb-4"></div>
          <p className="text-secondary dark:text-secondary-light">
            Loading your decks...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    const isAuthError = error.includes("log in") || error.includes("401");

    return (
      <div className="min-h-screen bg-background dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-red-500 mb-6">{error}</p>
          {isAuthError && (
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate("/login")} variant="primary">
                Log In
              </Button>
              <Button onClick={() => navigate("/signup")} variant="outline">
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-primary dark:text-accent hover:underline"
              aria-label="Back"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-primary dark:text-accent">
                My Decks
              </h1>
              <p className="text-secondary dark:text-secondary-light">
                Manage your pitch decks and templates
              </p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/create")}
            variant="primary"
            className="flex items-center gap-2"
          >
            <FiEdit3 className="w-4 h-4" />
            Create New Deck
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { id: "all", label: "All Decks" },
            { id: "templates", label: "Templates" },
            { id: "generated", label: "Generated Decks" },
            { id: "custom", label: "Custom Decks" },
          ].map((filterOption) => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                filter === filterOption.id
                  ? "bg-primary text-white shadow-lg scale-105"
                  : "bg-surface dark:bg-surface-dark text-secondary dark:text-secondary-light hover:bg-accent-light dark:hover:bg-accent hover:scale-105"
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>

        {/* Decks Grid */}
        {filteredDecks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-primary dark:text-accent mb-2">
              No decks found
            </h3>
            <p className="text-secondary dark:text-secondary-light mb-6">
              {filter === "all"
                ? "Create your first pitch deck to get started!"
                : `No ${
                    filter === "generated" ? "generated" : filter
                  } decks found.`}
            </p>
            {filter === "all" && (
              <div className="flex gap-4 justify-center">
                <Button onClick={() => navigate("/create")} variant="primary">
                  Create Custom Deck
                </Button>
                <Button
                  onClick={() => navigate("/templates")}
                  variant="outline"
                >
                  Browse Templates
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDecks.map((deck) => {
              const deckType = getDeckTypeLabel(deck.deckType);
              const statusColor = getStatusColor(deck.status);

              return (
                <div
                  key={deck._id || deck.id}
                  className="group relative bg-surface dark:bg-surface-dark rounded-2xl p-6 shadow-soft dark:shadow-neumorphic-dark hover:shadow-xl dark:hover:shadow-neumorphic-dark/50 transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-primary/20 dark:hover:border-accent/20"
                >
                  {/* Deck Type Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${deckType.color}`}
                    >
                      {deckType.label}
                    </span>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
                    >
                      {deck.status || "draft"}
                    </span>
                  </div>

                  {/* Deck Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-primary dark:text-accent mb-2 group-hover:text-primary-light dark:group-hover:text-accent-light transition-colors">
                      {getDeckTitle(deck)}
                    </h3>
                    <p className="text-secondary dark:text-secondary-light text-sm mb-3">
                      {getDeckDescription(deck)}
                    </p>

                    {/* Version Info */}
                    {deck.currentVersion && deck.currentVersion > 1 && (
                      <div className="flex items-center gap-2 text-xs text-secondary dark:text-secondary-light mb-3">
                        <FiClock className="w-3 h-3" />
                        <span>Version {deck.currentVersion}</span>
                        {deck.versions && deck.versions.length > 1 && (
                          <span>({deck.versions.length} total)</span>
                        )}
                      </div>
                    )}

                    {/* Template Info */}
                    {deck.spec?.template && (
                      <div className="flex items-center gap-2 text-xs text-secondary dark:text-secondary-light mb-3">
                        <FiTag className="w-3 h-3" />
                        <span>Based on {deck.spec.template.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Date Info */}
                  <div className="text-xs text-secondary dark:text-secondary-light mb-4">
                    <div>Created: {formatDate(deck.createdAt)}</div>
                    <div>Updated: {formatDate(deck.updatedAt)}</div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/view/${deck._id || deck.id}`)}
                      variant="primary"
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      <FiEye className="w-4 h-4" />
                      View/Edit
                    </Button>
                    <Button
                      onClick={() =>
                        handleDeleteClick(
                          deck._id || deck.id || "",
                          getDeckTitle(deck)
                        )
                      }
                      variant="danger"
                      className="px-3"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        )}

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title="Delete Deck"
          message={`Are you sure you want to delete "${deleteModal.deckTitle}"? This action cannot be undone.`}
          confirmText="Delete Deck"
          cancelText="Cancel"
          variant="danger"
          isLoading={deleteModal.isLoading}
        />
      </div>
    </div>
  );
};

export default MyDecks;
