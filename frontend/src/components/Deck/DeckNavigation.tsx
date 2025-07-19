import React, { useState, useCallback } from "react";
import {
  FiSave,
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";
import { useDrag, useDrop } from "react-dnd";

interface DeckNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onSlideChange: (index: number) => void;
  onSave?: () => void;
  onShare?: () => void;
  onEdit?: () => void;
  onPresent?: () => void;
  onPrint?: () => void;
  onDownloadPDF?: () => void;
  onDownloadPPTX?: () => void;
  isEditing?: boolean;
  deckTitle?: string;
  onBack?: () => void;
  backLabel?: string;
  hideDeckInfo?: boolean;
  slides?: { id: string }[];
  moveSlide?: (from: number, to: number) => void;
  onSlideClick?: (index: number) => void;
}

interface DraggableSlideProps {
  index: number;
  moveSlide: (from: number, to: number) => void;
  isActive: boolean;
  onClick: () => void;
}

interface DragItem {
  index: number;
  type: string;
}

const DND_ITEM_TYPE = "DECK_SLIDE";

const DraggableSlide: React.FC<DraggableSlideProps> = ({
  index,
  moveSlide,
  isActive,
  onClick,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [, drop] = useDrop<DragItem>({
    accept: DND_ITEM_TYPE,
    hover(item) {
      if (item.index === index) return;
      moveSlide(item.index, index);
      item.index = index;
    },
  });
  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    type: DND_ITEM_TYPE,
    item: { index, type: DND_ITEM_TYPE },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));
  return (
    <div
      ref={ref}
      className={`flex items-center justify-center w-8 h-8 font-bold text-xs rounded-full cursor-move transition-all duration-200 ${
        isActive
          ? "border-2 border-primary dark:border-accent bg-primary/20 dark:bg-accent/20 text-primary dark:text-accent shadow-lg"
          : "bg-surface dark:bg-surface-dark border border-transparent hover:border-primary dark:hover:border-accent hover:bg-primary/5 dark:hover:bg-accent/5"
      } ${isDragging ? "opacity-50" : ""}`}
      style={{ userSelect: "none" }}
      onClick={onClick}
    >
      {index + 1}
    </div>
  );
};

const DeckNavigation: React.FC<DeckNavigationProps> = ({
  currentSlide,
  totalSlides,
  onSlideChange,
  onSave,
  onShare,
  onEdit,
  onPresent,
  onPrint,
  onDownloadPDF,
  onDownloadPPTX,
  isEditing = false,
  deckTitle,
  onBack,
  backLabel,
  hideDeckInfo = false,
  slides,
  moveSlide,
  onSlideClick,
}) => {
  const [showToolsMenu, setShowToolsMenu] = useState(false);

  const goToFirst = useCallback(() => {
    if (typeof onSlideChange === "function") {
      onSlideChange(0);
    }
  }, [currentSlide, totalSlides, onSlideChange]);
  const goToLast = useCallback(() => {
    if (
      typeof onSlideChange === "function" &&
      typeof totalSlides === "number"
    ) {
      onSlideChange(totalSlides - 1);
    }
  }, [currentSlide, totalSlides, onSlideChange]);
  const goPrev = useCallback(() => {
    if (
      typeof onSlideChange === "function" &&
      typeof currentSlide === "number"
    ) {
      onSlideChange(Math.max(currentSlide - 1, 0));
    }
  }, [currentSlide, onSlideChange]);
  const goNext = useCallback(() => {
    if (
      typeof onSlideChange === "function" &&
      typeof currentSlide === "number" &&
      typeof totalSlides === "number"
    ) {
      onSlideChange(Math.min(currentSlide + 1, totalSlides - 1));
    }
  }, [currentSlide, totalSlides, onSlideChange]);

  return (
    <nav className="fixed z-[9999999] w-full max-w-6xl left-1/2 transform -translate-x-1/2 bottom-4 h-24 bg-surface dark:bg-surface-dark border border-secondary/20 dark:border-secondary-dark/20 rounded-2xl shadow-lg backdrop-blur-sm">
      {isEditing ? (
        <div className="flex h-full items-center px-4">
          {/* Left Section - Drag to Rearrange */}
          <div className="flex-1 flex items-center gap-4 overflow-x-auto min-w-0">
            <span className="flex items-center text-xs text-secondary dark:text-secondary-light mr-2 select-none flex-shrink-0">
              <svg
                className="w-4 h-4 mr-1 opacity-60"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 10h16M4 14h16"
                />
              </svg>
              Drag to rearrange
            </span>
            {slides &&
              moveSlide &&
              onSlideClick &&
              slides.map((slide, idx) => (
                <DraggableSlide
                  key={slide.id || idx}
                  index={idx}
                  moveSlide={moveSlide}
                  isActive={idx === currentSlide}
                  onClick={() => onSlideClick(idx)}
                />
              ))}
          </div>
          {/* Center Section - (empty in edit mode) */}
          <div className="flex-shrink-0 flex items-center justify-center gap-2" />
          {/* Right Section - Main Actions */}
          <div className="flex-shrink-0 flex items-center justify-end gap-2 ml-4">
            {/* Edit Mode Toggle */}
            <button
              onClick={onEdit}
              className={`inline-flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ${
                isEditing
                  ? "bg-primary dark:bg-accent text-white"
                  : "bg-secondary/20 dark:bg-secondary-dark/20 text-secondary dark:text-secondary-light hover:bg-secondary/30 dark:hover:bg-secondary-dark/30 hover:text-primary dark:hover:text-accent"
              }`}
              title={isEditing ? "Exit Edit Mode" : "Enter Edit Mode"}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid h-full grid-cols-12 gap-2 mx-auto px-4">
          {/* Left Section - Header Info & Back Button */}
          <div className="col-span-3 flex items-center gap-2">
            {!hideDeckInfo && onBack && (
              <button
                onClick={onBack}
                className="inline-flex flex-col items-center justify-center px-3 py-2 rounded-l-xl hover:bg-background dark:hover:bg-background-dark group transition-colors"
                title={backLabel || "Back"}
              >
                <svg
                  className="w-4 h-4 mb-1 text-secondary dark:text-secondary-light group-hover:text-primary dark:group-hover:text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="text-xs text-secondary dark:text-secondary-light">
                  {backLabel || "Back"}
                </span>
              </button>
            )}
            {/* Deck Title */}
            {!hideDeckInfo && (
              <div className="flex flex-col items-start justify-center pl-4">
                <h1 className="text-sm font-bold text-primary dark:text-accent truncate max-w-max">
                  {deckTitle || "Pitch Deck Editor"}
                </h1>
                <p className="text-xs text-secondary dark:text-secondary-light">
                  Slide{" "}
                  {typeof currentSlide === "number" ? currentSlide + 1 : "?"} of{" "}
                  {typeof totalSlides === "number" ? totalSlides : "?"}
                </p>
              </div>
            )}
          </div>
          {/* Center Section - Navigation Controls */}
          <div className="col-span-6 flex items-center justify-center gap-2">
            {/* First Slide */}
            <button
              onClick={goToFirst}
              className="inline-flex flex-col items-center justify-center px-3 py-2 rounded-l-xl hover:bg-background dark:hover:bg-background-dark group transition-colors"
              title="First Slide"
            >
              <FiChevronsLeft className="w-4 h-4 mb-1 text-secondary dark:text-secondary-light group-hover:text-primary dark:group-hover:text-accent" />
              <span className="text-xs text-secondary dark:text-secondary-light">
                First
              </span>
            </button>
            {/* Previous Slide */}
            <button
              onClick={goPrev}
              disabled={typeof currentSlide !== "number" || currentSlide === 0}
              className="inline-flex flex-col items-center justify-center px-3 py-2 hover:bg-background dark:hover:bg-background-dark group transition-colors disabled:opacity-50"
              title="Previous Slide"
            >
              <FiChevronLeft className="w-4 h-4 mb-1 text-secondary dark:text-secondary-light group-hover:text-primary dark:group-hover:text-accent" />
              <span className="text-xs text-secondary dark:text-secondary-light">
                Prev
              </span>
            </button>
            {/* Slide Counter */}
            <div className="flex flex-col items-center justify-center px-3 py-2">
              <span className="text-sm font-medium text-primary dark:text-accent">
                {typeof currentSlide === "number" ? currentSlide + 1 : "?"} /{" "}
                {typeof totalSlides === "number" ? totalSlides : "?"}
              </span>
              <span className="text-xs text-secondary dark:text-secondary-light">
                Slide
              </span>
            </div>
            {/* Next Slide */}
            <button
              onClick={goNext}
              disabled={
                typeof currentSlide !== "number" ||
                typeof totalSlides !== "number" ||
                currentSlide === totalSlides - 1
              }
              className="inline-flex flex-col items-center justify-center px-3 py-2 hover:bg-background dark:hover:bg-background-dark group transition-colors disabled:opacity-50"
              title="Next Slide"
            >
              <FiChevronRight className="w-4 h-4 mb-1 text-secondary dark:text-secondary-light group-hover:text-primary dark:group-hover:text-accent" />
              <span className="text-xs text-secondary dark:text-secondary-light">
                Next
              </span>
            </button>
            {/* Last Slide */}
            <button
              onClick={goToLast}
              className="inline-flex flex-col items-center justify-center px-3 py-2 rounded-r-xl hover:bg-background dark:hover:bg-background-dark group transition-colors"
              title="Last Slide"
            >
              <FiChevronsRight className="w-4 h-4 mb-1 text-secondary dark:text-secondary-light group-hover:text-primary dark:group-hover:text-accent" />
              <span className="text-xs text-secondary dark:text-secondary-light">
                Last
              </span>
            </button>
          </div>
          {/* Right Section - Main Actions */}
          <div className="col-span-3 flex items-center justify-end gap-2">
            {/* Edit Mode Toggle */}
            <button
              onClick={onEdit}
              className={`inline-flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ${
                isEditing
                  ? "bg-primary dark:bg-accent text-white"
                  : "bg-secondary/20 dark:bg-secondary-dark/20 text-secondary dark:text-secondary-light hover:bg-secondary/30 dark:hover:bg-secondary-dark/30 hover:text-primary dark:hover:text-accent"
              }`}
              title={isEditing ? "Exit Edit Mode" : "Enter Edit Mode"}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            {/* Present Mode */}
            <button
              onClick={onPresent}
              className="inline-flex flex-col items-center justify-center w-12 h-12 rounded-full bg-secondary/20 dark:bg-secondary-dark/20 text-secondary dark:text-secondary-light hover:bg-secondary/30 dark:hover:bg-secondary-dark/30 hover:text-primary dark:hover:text-accent transition-all duration-200"
              title="Present Deck"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
            {/* Save */}
            <button
              onClick={() => {
                onSave?.();
              }}
              className="inline-flex flex-col items-center justify-center w-12 h-12 rounded-full bg-secondary/20 dark:bg-secondary-dark/20 text-secondary dark:text-secondary-light hover:bg-secondary/30 dark:hover:bg-secondary-dark/30 hover:text-primary dark:hover:text-accent transition-all duration-200"
              title="Save Deck"
            >
              <FiSave className="w-5 h-5" />
            </button>
            {/* Settings & Export Menu */}
            <div className="relative">
              <button
                onClick={() => setShowToolsMenu(!showToolsMenu)}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/20 dark:bg-secondary-dark/20 text-secondary dark:text-secondary-light hover:bg-secondary/30 dark:hover:bg-secondary-dark/30 hover:text-primary dark:hover:text-accent transition-all duration-200"
                title="Export"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </button>
              {/* Export Dropdown */}
              {showToolsMenu && (
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-surface dark:bg-surface-dark border border-secondary/20 dark:border-secondary-dark/20 rounded-lg shadow-lg z-[99999999]">
                  <div className="p-2">
                    <button
                      onClick={onDownloadPDF}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-secondary dark:text-secondary-light hover:bg-background dark:hover:bg-background-dark rounded transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      Download PDF
                    </button>
                    <button
                      onClick={onDownloadPPTX}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-secondary dark:text-secondary-light hover:bg-background dark:hover:bg-background-dark rounded transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download PPTX
                    </button>
                    <button
                      onClick={onPrint}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-secondary dark:text-secondary-light hover:bg-background dark:hover:bg-background-dark rounded transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                        />
                      </svg>
                      Print
                    </button>
                    <button
                      onClick={onShare}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-secondary dark:text-secondary-light hover:bg-background dark:hover:bg-background-dark rounded transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Click outside to close dropdowns */}
      {showToolsMenu && (
        <div
          className="fixed inset-0 z-[99999999]"
          onClick={() => setShowToolsMenu(false)}
        />
      )}
    </nav>
  );
};

export default DeckNavigation;
