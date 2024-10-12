"use client";
import { CircleX } from "lucide-react";
import React, { useState } from "react";
import LoginForm from "src/components/LoginForm";
import SignupForm from "src/components/ui/SignupForm";

const LoginPage = () => {
  const [signupOpen, setSignUpOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex md:w-1/2 cool-bg items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome Back</h1>
          <p className="text-xl">{"We're so excited to see you again!"}</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-6 text-center text-neutral-800">
            Sign In
          </h2>
          <LoginForm />
          <p className="mt-8 text-center text-sm text-gray-600">
            {" Don't have an account? "}
            <button
              onClick={() => setSignUpOpen(true)}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
      <div
        className={`${
          signupOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } z-50 h-full w-full backdrop-blur-lg flex flex-col justify-center items-center transition-opacity ease-in-out duration-500 fixed`}
      >
        <div className=" bg-white md:p-14 p-3 md:h-[620px] md:w-[450px] w-full h-full flex flex-col justify-evenly items-center border border-neutral-200">
          <CircleX
            onClick={() => setSignUpOpen(false)}
            width={40}
            height={40}
            className="text-neutral-800 hover:text-red-700 -mt-6 -mr-5 cursor-pointer"
          />
          <SignupForm setSignUpOpen={setSignUpOpen} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
