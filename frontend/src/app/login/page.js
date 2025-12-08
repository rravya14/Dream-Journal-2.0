"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authApi } from "@/lib/api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.identifier.trim()) {
      newErrors.identifier = "Email or username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      await authApi.login(formData);
      router.push("/dashboard");
    } catch (error) {
      setApiError(error.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden">
      {/* Stars */}
      <div className="absolute inset-0">
        <div className="stars animate-twinkle"></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center animate-glow">
              <span className="text-3xl">🌙</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-400">
            Log in to continue your dream journey
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email or Username"
              name="identifier"
              type="text"
              placeholder="Enter your email or username"
              value={formData.identifier}
              onChange={handleChange}
              error={errors.identifier}
              disabled={loading}
              autoComplete="username"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              disabled={loading}
              autoComplete="current-password"
            />

            {apiError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
                <p className="text-sm text-red-400">{apiError}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Don&apos;t have an account?{" "}
              <Link 
                href="/signup" 
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}


