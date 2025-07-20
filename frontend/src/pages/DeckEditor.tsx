import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SlideRenderer from "@/components/Deck/SlideRenderer";
import type { DeckSpec } from "@/components/Deck/slideTypes";
import { SlideContainer } from "@/components/Deck/SliderContainer";
import DeckNavigation from "@/components/Deck/DeckNavigation";
import {
  getDeckById,
  updateDeckSlides,
  updateDeckTheme,
  updateDeckTitle,
} from "@/api/decks";
import { getTemplateById } from "@/services/templateService";
import Button from "@/components/ui/Button";
import { exportDeckPdf } from "@/api/decks";
import PptxGenJS from "pptxgenjs";

// Add a module declaration for html2pdf.js if missing
declare module "html2pdf.js";

interface DeckSlide {
  title?: string;
  items?: (string | Record<string, unknown>)[];
}

interface DeckResponse extends DeckSpec {
  title?: string;
}

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
  const [deckTitle, setDeckTitle] = useState<string>("Pitch Deck Editor");
  const slideContainerRef = React.useRef<HTMLDivElement>(null);
  const pdfContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we have a template ID from URL params
    const templateParam = searchParams.get("template");
    if (templateParam) {
      setTemplateId(templateParam);
      loadTemplate();
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
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex, showNavigation]);

  // Keyboard navigation
  useEffect(() => {
    if (!deck) return;

    const slides = deck.slides || [];
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
        setShowNavigation(true);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1));
        setShowNavigation(true);
      } else if (event.key === "Home") {
        event.preventDefault();
        setCurrentIndex(0);
        setShowNavigation(true);
      } else if (event.key === "End") {
        event.preventDefault();
        setCurrentIndex(slides.length - 1);
        setShowNavigation(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, deck]);

  const loadTemplate = () => {
    setLoading(true);
    setError(null);

    const template = getTemplateById();
    if (template && template.generateDeck) {
      const generatedDeck = template.generateDeck();
      setDeck(generatedDeck);
      setLoading(false);
    } else {
      setError("Template not found or invalid");
      setLoading(false);
    }
  };

  const loadExistingDeck = async (deckId: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getDeckById(deckId);

      // Ensure we have the correct data structure and provide defaults
      if (data) {
        // Provide defaults for missing properties
        const deckWithDefaults = {
          slides: data.slides || [],
          theme: data.theme || {
            primaryColor: "#2563eb",
            secondaryColor: "#059669",
            fontFamily: "Inter, system-ui, sans-serif",
          },
        };

        setDeck(deckWithDefaults);

        // Set deck title from data if available
        const deckData = data as DeckResponse;
        if (deckData.title) {
          setDeckTitle(deckData.title);
        }
      } else {
        setError("No deck data received from server");
      }
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

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
    setShowNavigation(true); // Show navigation when changing slides
  };

  const slides = deck?.slides || [];
  const currentSlide = slides[currentIndex];

  // Safety check: if no slides or current slide doesn't exist, show empty state
  if (!slides.length || !currentSlide) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background dark:bg-background-dark">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-xl font-semibold text-primary dark:text-accent mb-2">
            No slides found
          </h3>
          <p className="text-secondary dark:text-secondary-light mb-6">
            This deck doesn't have any slides yet.
          </p>
          <Button onClick={() => navigate("/templates")} variant="primary">
            Browse Templates
          </Button>
        </div>
      </div>
    );
  }

  const handleTitleChange = async (newTitle: string) => {
    if (!id) {
      toast.error("No deck ID available");
      return;
    }

    try {
      await updateDeckTitle(id, newTitle);
      setDeckTitle(newTitle);
      toast.success("Title updated successfully!");
    } catch {
      toast.error("Failed to update title. Please try again.");
    }
  };

  const handleSave = async () => {
    if (!deck || !id) {
      toast.error("No deck to save or missing deck ID");
      return;
    }

    try {
      // Use dedicated endpoints for better reliability
      if (deck.slides) {
        await updateDeckSlides(id, deck.slides);
      }
      if (deck.theme) {
        await updateDeckTheme(
          id,
          deck.theme as unknown as Record<string, unknown>
        );
      }
      toast.success("Deck saved successfully!");
    } catch {
      toast.error("Failed to save deck. Please try again.");
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handlePresent = () => {
    // This would enter presentation mode
  };

  const handlePrint = () => {
    // This would print the deck
  };

  const handleDownloadPDF = async () => {
    if (!deck || !deck.slides) return;
    if (!pdfContainerRef.current) {
      toast.error("PDF export failed: container not found.");
      return;
    }
    try {
      const html = pdfContainerRef.current.innerHTML;
      await exportDeckPdf(html, "pitch-deck.pdf");
      toast.success("PDF downloaded!");
    } catch {
      toast.error("PDF export failed. Please try again.");
    }
  };

  const handleDownloadPPTX = () => {
    if (!deck || !deck.slides) return;
    const pptx = new PptxGenJS();
    pptx.defineLayout({ name: "Widescreen", width: 13.33, height: 7.5 });
    pptx.layout = "Widescreen";
    (deck.slides as DeckSlide[]).forEach((slide) => {
      const slideObj = pptx.addSlide();
      slideObj.background = { fill: "FFFFFF" };
      let y = 0.5;
      if (slide.title) {
        slideObj.addText(slide.title, {
          x: 0.5,
          y,
          fontSize: 28,
          bold: true,
          color: "#1a365d",
          align: "center",
          w: 12,
        });
        y += 0.7;
      }
      if (slide.items && Array.isArray(slide.items)) {
        slide.items.forEach((item, i) => {
          if (typeof item !== "object" || !item.name) return;
          const props: Record<string, unknown> = { ...(item.props || {}) };
          switch (item.name) {
            case "LabelHeader": {
              const text = typeof props.text === "string" ? props.text : "";
              const subtext =
                typeof props.subtext === "string" ? props.subtext : undefined;
              const color =
                typeof props.color === "string" ? props.color : "#1a365d";
              slideObj.addText(text, {
                x: 0.5,
                y,
                fontSize: 32,
                bold: true,
                color,
                align: "center",
                w: 12,
              });
              y += 0.7;
              if (subtext) {
                slideObj.addText(subtext, {
                  x: 0.5,
                  y,
                  fontSize: 20,
                  color: "#444444",
                  align: "center",
                  w: 12,
                });
                y += 0.5;
              }
              break;
            }
            case "MetricCard": {
              const title = typeof props.title === "string" ? props.title : "";
              const value = typeof props.value === "string" ? props.value : "";
              const subtitle =
                typeof props.subtitle === "string" ? props.subtitle : undefined;
              // Draw a colored rectangle as background
              slideObj.addShape(pptx.ShapeType.rect, {
                x: 0.5 + i * 4,
                y,
                w: 3.5,
                h: 1.5,
                fill: { color: "#3182ce" },
                line: { color: "#3182ce" },
                shadow: {
                  type: "outer",
                  color: "#000000",
                  blur: 4,
                  offset: 2,
                  angle: 45,
                  opacity: 0.2,
                },
              });
              // Add value (large)
              slideObj.addText(value, {
                x: 0.7 + i * 4,
                y: y + 0.2,
                fontSize: 28,
                bold: true,
                color: "FFFFFF",
                w: 3.1,
                align: "center",
              });
              // Add title (small, top left)
              slideObj.addText(title, {
                x: 0.7 + i * 4,
                y: y + 0.05,
                fontSize: 12,
                color: "#e0e7ef",
                w: 3.1,
                align: "left",
              });
              // Add subtitle (small, bottom)
              if (subtitle) {
                slideObj.addText(subtitle, {
                  x: 0.7 + i * 4,
                  y: y + 1.0,
                  fontSize: 12,
                  color: "#e0e7ef",
                  w: 3.1,
                  align: "center",
                });
              }
              break;
            }
            case "LogoDisplay": {
              const companyName =
                typeof props.companyName === "string"
                  ? props.companyName
                  : "Logo";
              slideObj.addText(companyName, {
                x: 5.5,
                y: y + 0.2,
                fontSize: 36,
                bold: true,
                color: "#3182ce",
                align: "center",
                w: 2,
              });
              break;
            }
            case "IllustrationFlow": {
              const title = typeof props.title === "string" ? props.title : "";
              const description =
                typeof props.description === "string" ? props.description : "";
              const color =
                typeof props.color === "string" ? props.color : "#3182ce";
              slideObj.addShape(pptx.ShapeType.rect, {
                x: 0.5 + i * 4,
                y,
                w: 3.5,
                h: 1.5,
                fill: { color },
                line: { color },
                shadow: {
                  type: "outer",
                  color: "#000000",
                  blur: 4,
                  offset: 2,
                  angle: 45,
                  opacity: 0.2,
                },
              });
              slideObj.addText(title, {
                x: 0.7 + i * 4,
                y: y + 0.2,
                fontSize: 20,
                bold: true,
                color: "#FFFFFF",
                w: 3.1,
                align: "center",
              });
              slideObj.addText(description, {
                x: 0.7 + i * 4,
                y: y + 0.7,
                fontSize: 12,
                color: "#e0e7ef",
                w: 3.1,
                align: "center",
              });
              break;
            }
            case "DeckChart": {
              // Render as a table and add a note
              const data = props.data as unknown;
              if (
                data &&
                typeof data === "object" &&
                "labels" in data &&
                Array.isArray((data as { labels: unknown[] }).labels) &&
                "datasets" in data &&
                Array.isArray((data as { datasets: unknown[] }).datasets)
              ) {
                const labels = (data as { labels: unknown[] }).labels;
                const datasets = (data as { datasets: unknown[] }).datasets;
                const tableRows = [
                  ["", ...labels],
                  ...datasets.map((ds) => {
                    if (
                      typeof ds === "object" &&
                      ds !== null &&
                      "label" in ds
                    ) {
                      const dsObj = ds as unknown;
                      if (
                        typeof dsObj === "object" &&
                        dsObj !== null &&
                        "data" in dsObj &&
                        Array.isArray((dsObj as { data: unknown[] }).data)
                      ) {
                        return [
                          (ds as { label: string }).label,
                          ...(dsObj as { data: unknown[] }).data,
                        ];
                      }
                      return [(ds as { label: string }).label];
                    }
                    return [JSON.stringify(ds)];
                  }),
                ];
                slideObj.addTable(tableRows as PptxGenJS.TableRow[], {
                  x: 0.5,
                  y: y + 0.2,
                  w: 10,
                  fontSize: 12,
                  border: { pt: 1, color: "#3182ce" },
                });
                slideObj.addText("[Chart: " + (props.type || "Chart") + "]", {
                  x: 0.5,
                  y: y + 1.5,
                  fontSize: 10,
                  color: "#888888",
                  w: 10,
                  align: "left",
                });
              }
              break;
            }
            case "FeatureList": {
              const title = typeof props.title === "string" ? props.title : "";
              const features = Array.isArray(props.features)
                ? (props.features as unknown[])
                : [];
              slideObj.addText(title, {
                x: 0.5,
                y,
                fontSize: 20,
                bold: true,
                color: "#3182ce",
                w: 10,
                align: "left",
              });
              features.forEach((f, idx: number) => {
                let text = "";
                if (
                  typeof f === "object" &&
                  f !== null &&
                  "text" in f &&
                  typeof (f as { text: unknown }).text === "string"
                ) {
                  text = (f as { text: string }).text;
                } else {
                  text = JSON.stringify(f);
                }
                slideObj.addText("• " + text, {
                  x: 0.7,
                  y: y + 0.5 + idx * 0.3,
                  fontSize: 14,
                  color: "#363636",
                  w: 9,
                  align: "left",
                });
              });
              break;
            }
            case "QuoteCard": {
              const quote = typeof props.quote === "string" ? props.quote : "";
              const author =
                typeof props.author === "string" ? props.author : "";
              const company =
                typeof props.company === "string" ? props.company : "";
              slideObj.addText("\u201C" + quote + "\u201D", {
                x: 0.5,
                y,
                fontSize: 18,
                italic: true,
                color: "#2d3748",
                w: 10,
                align: "left",
              });
              slideObj.addText(
                "- " + author + (company ? ", " + company : ""),
                {
                  x: 0.5,
                  y: y + 0.7,
                  fontSize: 14,
                  color: "#3182ce",
                  w: 10,
                  align: "left",
                }
              );
              break;
            }
            case "ComparisonTable": {
              const headers = Array.isArray(props.headers) ? props.headers : [];
              const rows = Array.isArray(props.rows) ? props.rows : [];
              const tableRows = [headers, ...rows];
              slideObj.addTable(tableRows, {
                x: 0.5,
                y,
                w: 10,
                fontSize: 12,
                border: { pt: 1, color: "#3182ce" },
              });
              break;
            }
            default: {
              // Fallback: stringify the item
              slideObj.addText(
                typeof item === "string" ? item : JSON.stringify(item),
                { x: 0.5, y: y + i * 0.5, fontSize: 14, color: "363636", w: 12 }
              );
            }
          }
        });
      }
    });
    pptx.writeFile({ fileName: "pitch-deck.pptx" });
  };

  const handleShare = () => {
    // This would share the deck
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseY = event.clientY;
    const threshold = 100; // Show navigation when mouse is within 100px of bottom

    if (mouseY > rect.bottom - threshold) {
      setShowNavigation(true);
    }
  };

  // Add moveSlide handler for reordering
  const moveSlide = (from: number, to: number) => {
    setDeck((prev) => {
      if (!prev) return prev;
      const slides = [...prev.slides];
      const [removed] = slides.splice(from, 1);
      slides.splice(to, 0, removed);
      return { ...prev, slides };
    });
    setCurrentIndex(to);
  };

  // Handler to update layout of a slide item (move/resize)
  const handleLayoutChange = (
    itemIdx: number,
    layout: Partial<DeckSpec["slides"][number]["items"][number]["layout"]>
  ) => {
    setDeck((prev) => {
      if (!prev) return prev;
      const slides = [...prev.slides];
      const slide = { ...slides[currentIndex] };
      const items = [...slide.items];
      const item = { ...items[itemIdx] };

      item.layout = { ...item.layout, ...layout };

      items[itemIdx] = item;
      slide.items = items;
      slides[currentIndex] = slide;
      return { ...prev, slides };
    });
  };

  return (
    <>
      {/* Hidden container for PDF export - always rendered, just hidden off-screen */}
      <div
        style={{ position: "absolute", left: -9999, top: 0 }}
        ref={pdfContainerRef}
      >
        {deck.slides.map((slide, idx) => (
          <div
            key={idx}
            style={{
              width: "1120px",
              height: "630px",
              marginBottom: "24px",
              background: "#181F2A",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              borderRadius: 12,
            }}
          >
            <SlideContainer aspectRatio="16/9" useFullHeight={true}>
              <SlideRenderer
                items={slide.items}
                spacing={3}
                containerWidth="100%"
                containerHeight="100%"
                isEditing={isEditing}
                onLayoutChange={isEditing ? handleLayoutChange : undefined}
              />
            </SlideContainer>
          </div>
        ))}
      </div>
      {/* Main Content - Maximized Slide Display */}
      <div
        className="h-screen bg-background dark:bg-background-dark flex flex-col overflow-hidden relative"
        onMouseMove={handleMouseMove}
      >
        <div className="flex-1 flex items-center justify-center p-2 pb-4">
          <div
            className="w-full h-full max-w-[95vw] max-h-[calc(100vh-32px)]"
            ref={slideContainerRef}
          >
            <SlideContainer aspectRatio="16/9" useFullHeight={true}>
              <SlideRenderer
                items={currentSlide.items}
                spacing={3}
                containerWidth="100%"
                containerHeight="100%"
                isEditing={isEditing}
                onLayoutChange={isEditing ? handleLayoutChange : undefined}
              />
            </SlideContainer>
          </div>
        </div>
        {/* Hover area to trigger navigation */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 z-10"
          onMouseEnter={() => setShowNavigation(true)}
        />

        {/* Auto-hiding Deck Navigation Component */}
        <div
          className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ease-in-out ${
            showNavigation
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
          onMouseEnter={() => setShowNavigation(true)}
          onMouseLeave={() => {
            // Only hide if not actively being used
            setTimeout(() => setShowNavigation(false), 1000);
          }}
        >
          <DeckNavigation
            currentSlide={currentIndex}
            totalSlides={slides.length}
            onSlideChange={handleSlideChange}
            onSave={handleSave}
            onShare={handleShare}
            onEdit={handleEdit}
            onPresent={handlePresent}
            onPrint={handlePrint}
            onDownloadPDF={handleDownloadPDF}
            onDownloadPPTX={handleDownloadPPTX}
            isEditing={isEditing}
            deckTitle={deckTitle}
            onTitleChange={handleTitleChange}
            onBack={() => navigate(templateId ? "/templates" : "/")}
            backLabel={templateId ? "Templates" : "Home"}
            hideDeckInfo={false}
            // New props for rearrange UI
            slides={slides}
            moveSlide={moveSlide}
            onSlideClick={handleSlideChange}
          />
        </div>
      </div>
    </>
  );
};

export default DeckEditor;
