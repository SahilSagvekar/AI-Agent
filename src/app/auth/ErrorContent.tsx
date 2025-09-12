"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function ErrorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");

  // Customize error title and message
  let title = "Authentication Error";
  let message = "An unexpected error occurred.";
  if (error === "EmailAlreadyExists") {
    title = "Email Already Exists";
    message = "A user with this email already exists. Sign-in denied.";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafd]">
      <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center max-w-md w-full">
        {/* Glowing Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-[#7a4afc] p-4 shadow-lg relative">
            <div className="absolute inset-0 rounded-full" style={{
              filter: 'blur(16px)',
              boxShadow: '0 0 32px 8px #a78bfa'
            }} />
            {/* Shield+Exclamation SVG */}
            <svg
              className="relative z-10 w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M12 4l7 4v6a8.99 8.99 0 01-7 8A8.99 8.99 0 015 14V8l7-4z" />
            </svg>
          </div>
        </div>
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-1">
          {title}
        </h1>
        {/* Underline */}
        <div className="w-16 h-1 rounded-full mx-auto bg-gradient-to-r from-purple-400 to-purple-600 mb-4" />
        {/* Message */}
        <p className="text-lg text-gray-500 text-center mb-6">
          {message}
        </p>
        {/* Action Button */}
        <button
          onClick={() => router.push("/")}
          className="bg-[#7a4afc] hover:bg-[#511be9] transition text-white font-semibold rounded-lg px-8 py-3 text-base focus:outline-none shadow-lg"
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
}
