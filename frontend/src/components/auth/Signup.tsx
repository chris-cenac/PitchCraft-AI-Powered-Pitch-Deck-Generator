import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiProjectorScreenChartBold } from "react-icons/pi";
import { signup } from "@/api/auth";
import type { SignupDto } from "@/api/auth";
import { toast } from "react-hot-toast";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    const payload: SignupDto = {
      email: data.get("email") as string,
      password: data.get("password") as string,
      confirmPassword: data.get("confirmPassword") as string,
    };

    // Client-side validation
    if (payload.password !== payload.confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    if (payload.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    // Check for password complexity requirements
    const hasUpperCase = /[A-Z]/.test(payload.password);
    const hasLowerCase = /[a-z]/.test(payload.password);
    const hasNumber = /\d/.test(payload.password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    setIsLoading(true);

    try {
      await signup(payload);
      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-background dark:bg-background-dark">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-primary dark:text-accent"
        >
          <PiProjectorScreenChartBold className="mr-2 text-4xl text-primary dark:text-accent" />
          Pitch Craft
        </a>
        <div className="w-full bg-surface rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-surface-dark dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl dark:text-accent">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="signup-email"
                  className="block mb-2 text-sm font-medium text-primary dark:text-accent"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="signup-email"
                  placeholder="name@company.com"
                  className="bg-background border border-secondary text-primary text-sm rounded-lg 
                             focus:ring-accent focus:border-accent block w-full p-2.5 
                             dark:bg-background-dark dark:border-secondary-dark dark:placeholder-gray-400 
                             dark:text-accent-light dark:focus:ring-accent dark:focus:border-accent"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label
                  htmlFor="signup-password"
                  className="block mb-2 text-sm font-medium text-primary dark:text-accent"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="signup-password"
                  placeholder="••••••••"
                  className="bg-background border border-secondary text-primary text-sm rounded-lg 
                             focus:ring-accent focus:border-accent block w-full p-2.5 
                             dark:bg-background-dark dark:border-secondary-dark dark:placeholder-gray-400 
                             dark:text-accent-light dark:focus:ring-accent dark:focus:border-accent"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label
                  htmlFor="signup-confirm-password"
                  className="block mb-2 text-sm font-medium text-primary dark:text-accent"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="signup-confirm-password"
                  placeholder="••••••••"
                  className="bg-background border border-secondary text-primary text-sm rounded-lg 
                             focus:ring-accent focus:border-accent block w-full p-2.5 
                             dark:bg-background-dark dark:border-secondary-dark dark:placeholder-gray-400 
                             dark:text-accent-light dark:focus:ring-accent dark:focus:border-accent"
                  required
                  disabled={isLoading}
                />
              </div>
              <label className="flex items-start cursor-pointer">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-secondary rounded focus:ring-3 focus:ring-accent 
                 dark:border-secondary-dark dark:focus:ring-accent dark:ring-offset-gray-800"
                    required
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    disabled={isLoading}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <span className="font-light text-secondary dark:text-accent-light">
                    I accept the{" "}
                    <a
                      className="font-medium text-primary hover:underline dark:text-accent"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </span>
                </div>
              </label>

              <button
                type="submit"
                disabled={!acceptedTerms || isLoading}
                className={`w-full text-surface font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                 focus:ring-4 focus:outline-none focus:ring-accent
                 ${
                   !acceptedTerms || isLoading
                     ? "bg-secondary cursor-not-allowed"
                     : "bg-primary hover:bg-primary-light dark:bg-primary-dark dark:hover:bg-primary cursor-pointer"
                 }`}
              >
                {isLoading ? "Creating account..." : "Create an account"}
              </button>
              <p className="text-sm font-light text-secondary dark:text-accent-light">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:underline dark:text-accent"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
