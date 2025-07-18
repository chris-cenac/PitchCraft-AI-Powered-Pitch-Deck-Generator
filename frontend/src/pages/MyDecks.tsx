import React, { useEffect, useState } from "react";
import { getAllDecks, deleteDeck } from "@/api/decks";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";

interface BusinessData {
  companyName?: string;
  tagline?: string;
}

interface Deck {
  _id?: string;
  id?: string;
  spec?: {
    businessData?: BusinessData;
  };
}

const MyDecks: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllDecks();
        setDecks(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to fetch decks");
      } finally {
        setLoading(false);
      }
    };
    fetchDecks();
  }, []);

  const handleDelete = async (deckId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this deck? This action cannot be undone."
      )
    )
      return;
    try {
      await deleteDeck(deckId);
      toast.success("Deck deleted successfully!");
      setDecks((prev) =>
        prev.filter((d) => d._id !== deckId && d.id !== deckId)
      );
    } catch {
      toast.error("Failed to delete deck. Please try again.");
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading your decks...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-background dark:bg-background-dark min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-primary dark:text-accent hover:underline"
        aria-label="Back"
      >
        <FiArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>
      <h1 className="text-3xl font-bold mb-8 text-primary dark:text-accent">
        My Decks
      </h1>
      {decks.length === 0 ? (
        <div className="text-secondary dark:text-secondary-light text-center">
          No decks found. Create your first pitch deck!
        </div>
      ) : (
        <ul className="space-y-4">
          {decks.map((deck) => (
            <li
              key={deck._id || deck.id}
              className="p-6 bg-surface dark:bg-surface-dark rounded-xl shadow flex items-center justify-between border border-secondary/20 dark:border-secondary-dark/20 transition hover:shadow-lg"
            >
              <div>
                <div className="font-semibold text-xl text-primary dark:text-accent">
                  {deck.spec?.businessData?.companyName || "Untitled Deck"}
                </div>
                <div className="text-sm text-secondary dark:text-secondary-light">
                  {deck.spec?.businessData?.tagline}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => navigate(`/view/${deck._id || deck.id}`)}
                  variant="primary"
                  className="px-4 py-2"
                >
                  View/Edit
                </Button>
                <Button
                  onClick={() => handleDelete(deck._id || deck.id || "")}
                  variant="danger"
                  className="px-4 py-2"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyDecks;
