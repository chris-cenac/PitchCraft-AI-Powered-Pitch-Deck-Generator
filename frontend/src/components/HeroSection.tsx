import Button from "@/components/ui/Button";
import { useTheme } from "@/hooks/useTheme";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const { toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-background dark:bg-background-dark transition-colors">
      {/* Dark mode toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-surface dark:bg-surface-dark text-primary dark:text-primary-light hover:bg-accent-light dark:hover:bg-accent transition-colors shadow-soft dark:shadow-neumorphic-dark"
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

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary dark:text-surface transition-colors ">
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
          <Button onClick={() => navigate("/create")} variant="primary">
            Get Started
            <svg
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Button>

          <Button href="#how-it-works" variant="outline">
            How It Works
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
