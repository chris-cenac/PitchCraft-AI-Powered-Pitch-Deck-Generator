import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import Button from "./Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          icon: "text-red-500",
          button: "danger" as const,
        };
      case "warning":
        return {
          icon: "text-yellow-500",
          button: "warning" as const,
        };
      case "info":
        return {
          icon: "text-blue-500",
          button: "primary" as const,
        };
      default:
        return {
          icon: "text-red-500",
          button: "danger" as const,
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface dark:bg-surface-dark rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl border border-border dark:border-border-dark">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className={`p-3 rounded-full bg-red-50 dark:bg-red-900/20 ${styles.icon}`}
          >
            <FiAlertTriangle className="w-8 h-8" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-primary dark:text-accent text-center mb-2">
          {title}
        </h3>

        {/* Message */}
        <p className="text-secondary dark:text-secondary-light text-center mb-6">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant={styles.button}
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {confirmText}
              </div>
            ) : (
              confirmText
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
