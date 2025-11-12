import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-4 text-slate-900">
      <h1 className="text-3xl font-semibold">Dream Journal 2.0</h1>
      <p className="text-center text-base text-slate-600">
        Access your account to start logging dreams.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/login"
          className="rounded border border-slate-400 px-6 py-2 text-center text-sm font-medium text-slate-800 hover:bg-slate-100"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="rounded border border-slate-400 px-6 py-2 text-center text-sm font-medium text-slate-800 hover:bg-slate-100"
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
}
