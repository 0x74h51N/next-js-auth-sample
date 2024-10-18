"use client";

import React, { Dispatch, useEffect, useState } from "react";
import { User, Mail, Lock, Check, BadgeCheck, Eye, EyeOff } from "lucide-react";
import { useActionState } from "react";
import { registerAction } from "src/app/actions/register";
import SubmitButton from "./SubmitButton";

const RegisterForm = ({
  setSignUpOpen,
}: {
  setSignUpOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [state, action, pending] = useActionState(registerAction, undefined);

  const toggleShowPassword = (fieldName: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  useEffect(() => {
    if (state?.message === "Register successful") {
      const timer = setTimeout(() => {
        setSignUpOpen(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state, setSignUpOpen]);

  return state?.message === "Register successful" ? (
    <div className="p-2 text-xl flex flex-col items-center gap-8 text-green-500">
      <BadgeCheck width={250} height={250} />
    </div>
  ) : (
    <form action={action} className="space-y-5">
      {/* Username Field */}
      <div className="min-w-[350px]">
        <label htmlFor="username" className="input-label">
          Username
        </label>
        <div className="relative">
          <input
            id="username"
            name="username"
            type="text"
            className="input"
            placeholder="John Doe"
          />
          <User className="icon" size={18} />
        </div>
        {state?.errors?.username && (
          <div className="text-sm text-red-500 mt-1">
            {state.errors.username}
          </div>
        )}
      </div>

      {/* Email Field */}
      <div className="min-w-[350px]">
        <label htmlFor="email" className="input-label">
          Email
        </label>
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            className="input"
            placeholder="you@example.com"
          />
          <Mail className="icon" size={18} />
        </div>
        {state?.errors?.email && (
          <div className="text-sm text-red-500 mt-1">{state.errors.email}</div>
        )}
      </div>

      {/* Password Field */}
      <div className="min-w-[350px]">
        <label htmlFor="password" className="input-label">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword.password ? "text" : "password"}
            className="input"
            placeholder="••••••••"
          />
          <Lock className="icon" size={18} />
          <button
            type="button"
            onClick={() => toggleShowPassword("password")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showPassword.password ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
        {Array.isArray(state?.errors?.password) ? (
          state?.errors?.password.map((error: string, index: number) => (
            <p key={index}>{error}</p>
          ))
        ) : (
          <p>{state?.errors?.password}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="min-w-[350px]">
        <label htmlFor="confirmPassword" className="input-label">
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword.confirmPassword ? "text" : "password"}
            className="input"
            placeholder="••••••••"
          />
          <Lock className="icon" size={18} />
          <button
            type="button"
            onClick={() => toggleShowPassword("confirmPassword")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showPassword.confirmPassword ? (
              <Eye size={18} />
            ) : (
              <EyeOff size={18} />
            )}
          </button>
        </div>
        {state?.errors?.confirmPassword && (
          <div className="text-sm text-red-500 mt-1">
            {state.errors.confirmPassword}
          </div>
        )}
      </div>
      {state?.message && (
        <div className="text-sm text-green-500">{state?.message}</div>
      )}
      <div>
        {state?.message === "Register successful" ? (
          <Check />
        ) : (
          <SubmitButton text="Register" pending={pending} />
        )}
      </div>
    </form>
  );
};

export default RegisterForm;
