"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, { error: "" });
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#14171a] px-4">
      <form
        action={action}
        className="w-full max-w-sm bg-[#1b1f22] border border-white/10 rounded-lg p-8 space-y-5"
      >
        <div>
          <h1 className="text-white text-2xl font-bold">Admin panel</h1>
          <p className="text-white/50 text-sm mt-1">Enter the admin password to continue.</p>
        </div>
        <input
          type="password"
          name="password"
          required
          autoFocus
          autoComplete="current-password"
          placeholder="Password"
          className="w-full rounded bg-[#14171a] border border-white/15 px-4 py-3 text-white outline-none focus:border-[#f0b31c]"
        />
        {state.error && <p className="text-red-400 text-sm">{state.error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded bg-[#f0b31c] text-[#14171a] font-bold py-3 disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
