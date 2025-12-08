"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authApi } from "@/lib/api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
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
      await authApi.signup(formData);
      router.push("/dashboard");
    } catch (error) {
      setApiError(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-liner-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden">
      {/* Stars */}
      <div className="absolute inset-0">
        <div className="stars animate-twinkle"></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 rounded-full bg-liner-to-br from-blue-500 to-purple-500 flex items-center justify-center animate-glow">
              <span className="text-3xl">🌙</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-liner-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Create Account
          </h1>
          <p className="text-slate-400">
            Start journaling your dreams
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              disabled={loading}
            />

            <Input
              label="Username"
              name="username"
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              disabled={loading}
              autoComplete="username"
            />

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              disabled={loading}
              autoComplete="email"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              disabled={loading}
              autoComplete="new-password"
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
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Already have an account?{" "}
              <Link 
                href="/login" 
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}


