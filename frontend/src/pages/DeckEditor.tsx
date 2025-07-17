import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SlideRenderer from "@/components/Deck/SlideRenderer";
import type { DeckSpec } from "@/components/Deck/slideTypes";
import { SlideContainer } from "@/components/Deck/SliderContainer";
import DeckNavigation from "@/components/Deck/DeckNavigation";
import { getDeckById } from "@/api/decks";
import { getTemplateById } from "@/services/templateService";
import Button from "@/components/ui/Button";

const DeckEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState<DeckSpec | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [showNavigation, setShowNavigation] = useState(true);

  useEffect(() => {
    // Check if we have a template ID from URL params
    const templateParam = searchParams.get("template");
    if (templateParam) {
      setTemplateId(templateParam);
      loadTemplate(templateParam);
    } else if (id) {
      // Load existing deck by ID
      loadExistingDeck(id);
    } else {
      setError("No template or deck ID provided");
      setLoading(false);
    }
  }, [id, searchParams]);

  // Auto-hide navigation after 3 seconds of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNavigation(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const loadTemplate = (templateId: string) => {
    setLoading(true);
    setError(null);

    const template = getTemplateById(templateId);
    if (template) {
      const generatedDeck = template.generateDeck();
      setDeck(generatedDeck);
      setLoading(false);
    } else {
      setError("Template not found");
      setLoading(false);
    }
  };

  const loadExistingDeck = async (deckId: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getDeckById(deckId);
      setDeck(data);
      setLoading(false);
    } catch {
      setError("Failed to load deck");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background dark:bg-background-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary dark:border-accent mx-auto mb-4"></div>
          <p className="text-secondary dark:text-secondary-light">
            Loading deck...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background dark:bg-background-dark">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-primary dark:text-accent mb-2">
            Error Loading Deck
          </h3>
          <p className="text-secondary dark:text-secondary-light mb-6">
            {error}
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate("/templates")} variant="primary">
              Browse Templates
            </Button>
            <Button onClick={() => navigate("/create")} variant="outline">
              Create Custom Deck
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!deck) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background dark:bg-background-dark">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-xl font-semibold text-primary dark:text-accent mb-2">
            No deck found
          </h3>
          <p className="text-secondary dark:text-secondary-light mb-6">
            The requested deck could not be loaded.
          </p>
          <Button onClick={() => navigate("/templates")} variant="primary">
            Browse Templates
          </Button>
        </div>
      </div>
    );
  }

  const slides = deck.slides || [];
  const currentSlide = slides[currentIndex];

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
    setShowNavigation(true); // Show navigation when changing slides
  };

  const handleSave = () => {
    // This would save the deck to the backend
    console.log("Saving deck:", deck);
    // For now, just show a success message
    toast.success("Deck saved successfully!");
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handlePresent = () => {
    // This would enter presentation mode
    console.log("Entering presentation mode");
    alert("Presentation mode coming soon!");
  };

  const handleUndo = () => {
    // This would undo the last action
    console.log("Undoing last action");
    alert("Undo functionality coming soon!");
  };

  const handleRedo = () => {
    // This would redo the last undone action
    console.log("Redoing last action");
    alert("Redo functionality coming soon!");
  };

  const handlePrint = () => {
    // This would print the deck
    console.log("Printing deck");
    alert("Print functionality coming soon!");
  };

  const handleDownloadPDF = () => {
    // This would download the deck as PDF
    console.log("Downloading PDF");
    alert("PDF download coming soon!");
  };

  const handleDownloadPPTX = () => {
    // This would download the deck as PPTX
    console.log("Downloading PPTX");
    alert("PPTX download coming soon!");
  };

  const handleShare = () => {
    // This would share the deck
    console.log("Sharing deck");
    alert("Share functionality coming soon!");
  };

  const handleMouseMove = () => {
    setShowNavigation(true);
  };

  return (
    <div
      className="h-screen bg-background dark:bg-background-dark flex flex-col overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Main Content - Maximized Slide Display */}
      <div className="flex-1 flex items-center justify-center p-2">
        <div className="w-full h-full max-w-[95vw] max-h-[calc(100vh-80px)]">
          <SlideContainer aspectRatio="16/9">
            <SlideRenderer
              items={currentSlide.items}
              spacing={3}
              containerWidth="100%"
              containerHeight="100%"
            />
          </SlideContainer>
        </div>
      </div>

      {/* Auto-hiding Deck Navigation Component */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          showNavigation
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }`}
      >
        <DeckNavigation
          currentSlide={currentIndex}
          totalSlides={slides.length}
          onSlideChange={handleSlideChange}
          onSave={handleSave}
          onShare={handleShare}
          onEdit={handleEdit}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onPresent={handlePresent}
          onPrint={handlePrint}
          onDownloadPDF={handleDownloadPDF}
          onDownloadPPTX={handleDownloadPPTX}
          canUndo={false}
          canRedo={false}
          isEditing={isEditing}
          deckTitle={
            templateId ? getTemplateById(templateId)?.name : "Pitch Deck Editor"
          }
          onBack={() => navigate(templateId ? "/templates" : "/")}
          backLabel={templateId ? "Templates" : "Home"}
        />
      </div>
    </div>
  );
};

export default DeckEditor;
