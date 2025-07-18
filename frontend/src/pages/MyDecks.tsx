import React, { useEffect, useState } from "react";
import { getAllDecks } from "@/api/decks";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

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

  if (loading) {
    return <div className="p-8 text-center">Loading your decks...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">My Decks</h1>
      {decks.length === 0 ? (
        <div>No decks found. Create your first pitch deck!</div>
      ) : (
        <ul className="space-y-4">
          {decks.map((deck) => (
            <li
              key={deck._id || deck.id}
              className="p-4 bg-surface rounded shadow flex items-center justify-between"
            >
              <div>
                <div className="font-semibold text-lg">
                  {deck.spec?.businessData?.companyName || "Untitled Deck"}
                </div>
                <div className="text-sm text-secondary">
                  {deck.spec?.businessData?.tagline}
                </div>
              </div>
              <Button
                onClick={() => navigate(`/view/${deck._id || deck.id}`)}
                variant="primary"
              >
                View/Edit
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyDecks;
