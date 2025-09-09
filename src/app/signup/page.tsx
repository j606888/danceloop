"use client";

import Link from "next/link";
import {
  useSignupMutation,
  useGoogleSignInMutation,
} from "@/store/slices/user";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";

const SignupPagesInner = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup] = useSignupMutation();
  const router = useRouter();
  const [error, setError] = useState("");
  const [googleSignIn] = useGoogleSignInMutation();
  const searchParams = useSearchParams();
  const continueUrl = searchParams.get("continue");

  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      await googleSignIn({ access_token: codeResponse.access_token }).unwrap();

      router.push(continueUrl || "/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signup({ name, email, password }).unwrap();
      router.push(continueUrl || "/");
    } catch (error: any) {
      console.log(error);
      setError(error?.data?.error);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-1 h-[54px] px-4 mb-8">
        <img src="/icons/Logo.svg" alt="DanceLoop Logo" />
        <h4 className="text-xl font-bold tracking-tight">DanceLoop</h4>
      </div>
      <div className="flex flex-col gap-4 px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-[32px] font-bold text-[#232323] leading-[32px]">
            Sign Up Account!
          </h1>
          <p className="text-[#777777]">
            Enter your information to create account
          </p>
        </div>
        <button
          className="flex items-center justify-center gap-2.5 py-4 border-1 rounded-[10px] border-[#E5E5E5] cursor-pointer"
          onClick={() => googleLogin()}
        >
          <img src="/icons/Google.svg" alt="Google" />
          <span>Continue with Google</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="border-[#E5E5E5] border-b w-1/2"></div>
          <span>OR</span>
          <div className="border-[#E5E5E5] border-b w-1/2"></div>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-[#444444] text-sm" htmlFor="email">
              Name
            </label>
            <input
              className="w-full h-[42px] px-4 rounded-[10px] border-1 border-[#E5E5E5] outline-[#6784F6]"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#444444] text-sm" htmlFor="email">
              Email
            </label>
            <input
              className="w-full h-[42px] px-4 rounded-[10px] border-1 border-[#E5E5E5] outline-[#6784F6]"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#444444] text-sm" htmlFor="password">
              Password
            </label>
            <input
              className="w-full h-[42px] px-4 rounded-[10px] border-1 border-[#E5E5E5] outline-[#6784F6]"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p className="text-[#BD4545] p-2.5 bg-[#FDEAEA] text-sm">{error}</p>
          )}
          <button
            className="w-full h-[42px] bg-[#6784F6] text-white font-semibold rounded-[10px] cursor-pointer mt-3"
            type="submit"
          >
            Sign Up
          </button>
          <p className="text-sm text-[#232323] text-center cursor-pointer">
            Already have an account?{" "}
            <Link href={`/login${continueUrl ? `?continue=${continueUrl}` : ""}`} className="text-[#6784F6] underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default function SignupPages() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupPagesInner />
    </Suspense>
  );
}
