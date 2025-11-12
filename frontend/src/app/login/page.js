"use client";

import { useState } from "react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { loginUser } from "@/lib/api";

const initialState = {
    identifier: "",
    password: "",
};

export default function LoginPage() {
    const [form, setForm] = useState(initialState);
    const [status, setStatus] = useState({ type: "idle", message: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus({ type: "loading", message: "Signing you in..." });

        try {
            const data = await loginUser(form);

            setStatus({ type: "success", message: data.message || "Login successful" });
            setForm(initialState);
        } catch (error) {
            setStatus({ type: "error", message: error.message });
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12 text-slate-900">
            <div className="w-full max-w-md space-y-6">
                <header className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold">Welcome back</h1>
                    <p className="text-sm text-slate-600">
                        Log in with your username or email to continue.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-4 rounded border border-slate-200 p-6 shadow-sm">
                    <div className="space-y-1">
                        <label htmlFor="identifier" className="text-sm font-medium text-slate-700">
                            Username or Email
                        </label>
                        <input
                            id="identifier"
                            name="identifier"
                            type="text"
                            required
                            value={form.identifier}
                            onChange={handleChange}
                            className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                            autoComplete="username"
                        />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="password" className="text-sm font-medium text-slate-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={form.password}
                            onChange={handleChange}
                            className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                            autoComplete="current-password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status.type === "loading"}
                        className="w-full rounded bg-slate-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-70"
                    >
                        {status.type === "loading" ? "Signing in..." : "Login"}
                    </button>

                    <div className="flex items-center justify-between text-sm text-slate-600">
                        <span>Need an account?</span>
                        <Link href="/signup" className="text-slate-800 underline">
                            Sign Up
                        </Link>
                    </div>
                </form>

                {status.type !== "idle" && (
                    <p
                        className={`text-sm ${status.type === "success"
                            ? "text-green-600"
                            : status.type === "error"
                                ? "text-red-600"
                                : "text-slate-600"
                            }`}
                    >
                        {status.message}
                    </p>
                )}

                <div className="flex justify-center">
                    <LogoutButton />
                </div>
            </div>
        </main>
    );
}

