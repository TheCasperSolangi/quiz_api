"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { ArrowRight, Eye, EyeOff, Loader2, Mail, Lock, User, CheckCircle2, AlertCircle } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button = ({ children, className = "", variant = "default", disabled, onClick, type = "button" }: ButtonProps) => {
  const base = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md active:scale-95";
  const variants = {
    default: "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white focus:ring-orange-500 shadow-orange-500/20",
    outline: "border-2 border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white focus:ring-orange-400",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${className} h-12 px-6 text-base`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = "", ...props }, ref) => (
  <input
    className={`w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none ${className}`}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
}

const Label = ({ children, className = "", ...props }: LabelProps) => (
  <label className={`block text-sm font-medium text-gray-300 mb-1.5 ${className}`} {...props}>
    {children}
  </label>
);

interface AlertProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "error";
  className?: string;
}

const Alert = ({ children, variant = "default", className = "" }: AlertProps) => {
  const styles = {
    default: "bg-white/5 border-white/10 text-white",
    success: "bg-green-500/10 border-green-500/20 text-green-400 backdrop-blur-sm",
    error: "bg-red-500/10 border-red-500/20 text-red-400 backdrop-blur-sm",
  };
  return (
    <div className={`rounded-xl border p-4 ${styles[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default function AgentraAuthPage() {
  const [isLogin, setIsLogin] = useState(true); // true = login, false = signup
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Valid email is required";
    }
    if (!formData.password || formData.password.length < 6) {
      errors.password = "Password ≥ 6 characters";
    }
    if (!isLogin && (!formData.fullname || formData.fullname.trim().length < 2)) {
      errors.fullname = "Full name is required";
    }

    return errors;
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);
    setSuccessMessage("");
    setValidationErrors({});

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const body = isLogin
        ? { email: formData.email, password: formData.password }
        : { fullname: formData.fullname, email: formData.email, password: formData.password };

      const res = await fetch(`https://api.deskarro.com${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (isLogin) {
        if (data.token) {
          setSuccess(true);
          setSuccessMessage("Login successful! Redirecting...");
          Cookies.set("token", data.token, { expires: 7 });
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("name", data.user.full_name);
          }

          setTimeout(() => {
            window.location.href = "/profile";
          }, 1400);
        } else {
          setError(data.message || "Authentication failed. Please try again.");
        }
      } else {
        // Signup Flow
        if (data.message === "User created successfully" || res.ok) {
          setSuccess(true);
          setSuccessMessage("Account created please continue and login");
          setFormData(prev => ({ ...prev, password: "" }));
          setTimeout(() => {
            setIsLogin(true);
            setSuccess(false);
          }, 3000);
        } else {
          setError(data.message || "Signup failed. Please try again.");
        }
      }
    } catch (err) {
      setError("Connection issue. Please check your network.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen flex bg-[#020617] selection:bg-orange-500/30">
      {/* Hero-style Left Panel */}
      <div className="hidden lg:flex lg:w-3/5 xl:w-2/3 relative overflow-hidden bg-gradient-to-br from-orange-600 via-red-600 to-rose-700">
        {/* Animated orbs */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-orange-400/30 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-32 -right-32 w-[800px] h-[800px] bg-amber-400/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-float" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 xl:px-24 text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <div className="w-28 h-28 rounded-3xl bg-white/15 backdrop-blur-lg border border-white/20 shadow-2xl flex items-center justify-center">
              <img src="/logo.png" alt="Agentra" className="w-20 h-20 object-contain" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl xl:text-7xl font-extrabold tracking-tight mb-6 text-center leading-tight"
          >
            Deskarro API
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-xl xl:text-2xl text-orange-50/90 max-w-2xl text-center leading-relaxed mb-12"
          >
            Next-gen AI automation • Intelligent agents • Enterprise-grade security • Built for scale
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-orange-50/80 text-lg font-medium"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white/60" />
              <span>AI-first platform</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white/60" />
              <span>Zero-trust security</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white/60" />
              <span>24/7 intelligent support</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-2/5 xl:w-1/3 flex items-center justify-center p-6 md:p-10 bg-[#020617] relative overflow-hidden">
        {/* Background glowing effects for dark mode */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/[0.03] backdrop-blur-2xl rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 p-8 md:p-10 relative z-10"
        >
          {/* Mobile logo + title */}
          <div className="lg:hidden text-center mb-10">
            <div className="inline-flex mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center shadow-xl shadow-orange-600/20">
                <span className="text-4xl font-black text-white">A</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Agentra</h1>
          </div>

          {/* Tabs */}
          <div className="flex rounded-xl bg-white/5 p-1 mb-8">
            <button
              onClick={() => {
                setIsLogin(true);
                setSuccess(false);
              }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${isLogin
                ? "bg-white/10 text-white shadow-lg"
                : "text-gray-400 hover:text-gray-200"
                }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setSuccess(false);
              }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${!isLogin
                ? "bg-white/10 text-white shadow-lg"
                : "text-gray-400 hover:text-gray-200"
                }`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 text-center tracking-tight">
            {isLogin ? "Welcome back" : "Get started"}
          </h2>
          <p className="text-gray-400 text-center mb-10 font-medium">
            {isLogin
              ? "Sign in to your agent dashboard"
              : "Create your Agentra account"}
          </p>

          {/* Messages */}
          {success && (
            <Alert variant="success" className="mb-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5" />
                <div>
                  <p className="font-medium">Success!</p>
                  <p className="text-sm opacity-90">{successMessage}</p>
                </div>
              </div>
            </Alert>
          )}

          {error && (
            <Alert variant="error" className="mb-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5" />
                <div>
                  <p className="font-medium">Error</p>
                  <p className="text-sm opacity-90">{error}</p>
                </div>
              </div>
            </Alert>
          )}

          <div className="space-y-6">
            {/* Full name – only signup */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5 transition-colors group-focus-within:text-orange-500" />
                  <Input
                    id="fullname"
                    placeholder="John Doe"
                    value={formData.fullname}
                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                    onKeyDown={handleKeyDown}
                    className="h-12 pl-11"
                    disabled={isLoading}
                  />
                </div>
                {validationErrors.fullname && (
                  <p className="text-sm text-red-400 flex items-center gap-1.5 mt-1 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="h-4 w-4" /> {validationErrors.fullname}
                  </p>
                )}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5 transition-colors group-focus-within:text-orange-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onKeyDown={handleKeyDown}
                  className="h-12 pl-11"
                  disabled={isLoading}
                />
              </div>
              {validationErrors.email && (
                <p className="text-sm text-red-400 flex items-center gap-1.5 mt-1 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="h-4 w-4" /> {validationErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5 transition-colors group-focus-within:text-orange-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onKeyDown={handleKeyDown}
                  className="h-12 pl-11 pr-11"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {validationErrors.password && (
                <p className="text-sm text-red-400 flex items-center gap-1.5 mt-1 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="h-4 w-4" /> {validationErrors.password}
                </p>
              )}
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {isLogin ? "Signing in..." : "Creating account..."}
                </>
              ) : isLogin ? (
                <>
                  Sign In <ArrowRight className="ml-2 h-5 w-5" />
                </>
              ) : (
                <>
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>

          <p className="mt-10 text-center text-xs text-gray-500 font-medium">
            © {new Date().getFullYear()} Agentra Technologies • Secure AI Operations
          </p>
        </motion.div>
      </div>
    </div>
  );
}