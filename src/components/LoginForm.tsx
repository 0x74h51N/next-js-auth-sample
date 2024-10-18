"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { submitAction } from "src/app/actions/auth";
import { useRouter } from "next/navigation";
import SubmitButton from "./ui/SubmitButton";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [state, action, pending] = useActionState(submitAction, {
    errors: {
      email: "",
      password: "",
    },
    message: "",
  });

  useEffect(() => {
    if (!state?.errors && state?.message === "Login successful")
      router.push("/dashboard");
  }, [state, router]);
  return (
    <form action={action} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address
        </label>
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            className="input"
            placeholder="you@example.com"
            required
          />
          <Mail className="icon" size={18} />
        </div>
        {state?.errors?.email && (
          <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className="input"
            placeholder="••••••••"
            required
          />
          <Lock className="icon" size={18} />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
        {state?.errors?.password && (
          <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>
        )}
      </div>
      {state?.message && (
        <p className="text-sm text-green-500">{state?.message}</p>
      )}
      <div>
        <SubmitButton text="Login" pending={pending} />
      </div>
    </form>
  );
};

export default LoginForm;
