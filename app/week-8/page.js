"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context"; 

export default function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Failed to log in", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <main className="min-h-screen bg-black p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">Shopping List App</h1>
      
      {user ? (
        <div className="text-center flex flex-col gap-4">
          <p className="text-xl text-white mb-4">
            Welcome, {user.displayName} ({user.email})
          </p>
          <Link 
            href="/week-8/shopping-list" 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Continue to your Shopping List
          </Link>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <button 
          onClick={handleLogin} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Login with GitHub
        </button>
      )}
    </main>
  );
}