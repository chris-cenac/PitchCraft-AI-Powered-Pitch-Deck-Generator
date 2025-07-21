import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import UserAvatar from "./ui/UserAvatar";
import { useTheme } from "@/hooks/useTheme";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  name?: string;
  roles?: string[];
}

const Hero: React.FC = () => {
  const { toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");

    if (storedUser && accessToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  const handleGetStarted = () => {
    if (user) {
      navigate("/create");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-background dark:bg-background-dark transition-colors">
      {/* Templates button - only show if logged in */}
      {user && (
        <div className="absolute top-4 left-4 z-20">
          <Button
            onClick={() => navigate("/templates")}
            variant="outline"
            className="relative overflow-hidden group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 border-primary text-white hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2 font-semibold">
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              Templates
            </span>
          </Button>
        </div>
      )}

      {/* Top right controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
        {/* User Avatar - only show if logged in */}
        {user && <UserAvatar user={user} onLogout={handleLogout} />}

        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-surface dark:bg-surface-dark text-primary dark:text-accent hover:bg-primary/10 dark:hover:bg-accent/20 hover:text-primary-dark dark:hover:text-accent-light transition-colors shadow-soft dark:shadow-neumorphic-dark border border-secondary/20 dark:border-secondary-dark/20"
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          {isDark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Login/Register buttons - only show if not logged in */}
      {!user && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="text-sm px-4 py-2 bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-sm border-secondary/30 hover:border-secondary/50 transition-all duration-200"
          >
            Login
          </Button>
          <Button
            onClick={() => navigate("/signup")}
            variant="primary"
            className="text-sm px-4 py-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Sign Up
          </Button>
        </div>
      )}

      {/* Background pattern */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url(${
            isDark
              ? "https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg"
              : "https://preline.co/assets/svg/examples/polygon-bg-element.svg"
          })`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl text-center px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-6">
          <a
            href="#"
            className="inline-flex items-center gap-x-2 bg-surface dark:bg-surface-dark border border-secondary text-secondary dark:text-secondary-light text-sm p-1 ps-3 rounded-full hover:border-secondary-light dark:hover:border-secondary transition-colors shadow-soft dark:shadow-neumorphic"
          >
            PitchCraft AI – Join the Waitlist
            <span className="py-1.5 px-2.5 inline-flex items-center gap-x-2 rounded-full bg-accent dark:bg-accent-dark font-semibold text-sm text-primary">
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </a>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary dark:text-surface transition-colors">
          Build Your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-tr from-primary to-secondary">
            Investor-Ready Pitch Deck
          </span>
        </h1>

        <p className="mt-6 text-lg text-secondary dark:text-secondary-light max-w-2xl mx-auto transition-colors">
          Instantly generate stunning pitch decks tailored to your startup using
          AI-powered templates.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Button
            onClick={handleGetStarted}
            variant="primary"
            className="px-6 py-3 text-lg rounded-lg w-48"
          >
            {user ? "Create Deck" : "Get Started"}
            <svg
              className="size-5 ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Button>

          <Button
            onClick={() => navigate("/how-it-works")}
            variant="outline"
            className="px-6 py-3 text-lg rounded-lg w-48"
          >
            How It Works
          </Button>
        </div>

        {/* User welcome message */}
        {user && (
          <div className="mt-8 text-secondary dark:text-secondary-light">
            Welcome back, {user.name || user.email.split("@")[0]}!
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
