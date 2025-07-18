import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { logout } from "@/api/auth";

interface User {
  id: string;
  email: string;
  name?: string;
  roles?: string[];
}

interface UserAvatarProps {
  user: User;
  onLogout: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      // Call the logout API if needed
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        await logout({ refreshToken });
      }

      // Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // Call the onLogout callback
      onLogout();

      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      // Still clear local storage and redirect even if API call fails
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      onLogout();
      navigate("/login");
    }
    setIsDropdownOpen(false);
  };

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  const displayName = user.name || user.email.split("@")[0];
  const initials = getInitials(user.name, user.email);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-10 h-10 rounded-full cursor-pointer bg-primary dark:bg-primary-dark text-white flex items-center justify-center font-medium text-sm hover:bg-primary-light dark:hover:bg-primary transition-colors shadow-soft dark:shadow-neumorphic-dark"
        aria-label="User menu"
      >
        {initials}
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-surface dark:bg-surface-dark divide-y divide-secondary/20 dark:divide-secondary-dark/20 rounded-lg shadow-soft dark:shadow-neumorphic-dark z-50 animate-fade-in">
          {/* User Info */}
          <div className="px-4 py-3 text-sm text-primary dark:text-surface">
            <div className="font-medium truncate">{displayName}</div>
            <div className="text-secondary dark:text-secondary-light truncate">
              {user.email}
            </div>
          </div>

          {/* Menu Items */}
          <ul className="py-2 text-sm text-secondary dark:text-secondary-light">
            <li>
              <button
                onClick={() => {
                  navigate("/mydecks");
                  setIsDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-background dark:hover:bg-background-dark hover:text-primary dark:hover:text-surface transition-colors"
              >
                My Decks
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/settings");
                  setIsDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-background dark:hover:bg-background-dark hover:text-primary dark:hover:text-surface transition-colors"
              >
                Settings
              </button>
            </li>
          </ul>

          {/* Logout */}
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
