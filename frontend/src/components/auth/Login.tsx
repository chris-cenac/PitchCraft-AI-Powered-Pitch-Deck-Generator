import React from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiProjectorScreenChartBold } from "react-icons/pi";
import { login } from "@/api/auth";
import type { LoginDto } from "@/api/auth";
import { toast } from "react-hot-toast";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const payload: LoginDto = {
      email: data.get("email") as string,
      password: data.get("password") as string,
    };

    try {
      const result = (await login(payload)) as {
        data: {
          tokens: {
            accessToken: string;
            refreshToken: string;
          };
          user: {
            id: string;
            email: string;
            name?: string;
            roles?: string[];
          };
        };
      };

      // Access tokens from the nested data.tokens structure
      const { accessToken, refreshToken } = result.data.tokens;

      localStorage.setItem("accessToken", accessToken);
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      // Optionally store user data as well
      localStorage.setItem("user", JSON.stringify(result.data.user));

      toast.success("Logged in!");
      navigate("/");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      toast.error(errorMessage);
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
              Log in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="login-email"
                  className="block mb-2 text-sm font-medium text-primary dark:text-accent"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="login-email"
                  placeholder="name@company.com"
                  className="bg-background border border-secondary text-primary text-sm rounded-lg 
                             focus:ring-accent focus:border-accent block w-full p-2.5 
                             dark:bg-background-dark dark:border-secondary-dark dark:placeholder-gray-400 
                             dark:text-accent-light dark:focus:ring-accent dark:focus:border-accent"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="login-password"
                  className="block mb-2 text-sm font-medium text-primary dark:text-accent"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="login-password"
                  placeholder="••••••••"
                  className="bg-background border border-secondary text-primary text-sm rounded-lg 
                             focus:ring-accent focus:border-accent block w-full p-2.5 
                             dark:bg-background-dark dark:border-secondary-dark dark:placeholder-gray-400 
                             dark:text-accent-light dark:focus:ring-accent dark:focus:border-accent"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 text-accent bg-background border-secondary rounded focus:ring-accent 
                               dark:bg-background-dark dark:border-secondary-dark dark:focus:ring-accent"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm font-medium text-secondary dark:text-accent-light"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline dark:text-accent"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-surface font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                           bg-primary hover:bg-primary-light focus:ring-4 focus:outline-none focus:ring-accent
                           dark:bg-primary-dark dark:hover:bg-primary"
              >
                Log in
              </button>
              <p className="text-sm font-light text-secondary dark:text-accent-light">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary hover:underline dark:text-accent"
                >
                  Sign up here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
