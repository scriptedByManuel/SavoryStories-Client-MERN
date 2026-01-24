"use client";

import { useState } from "react";
import { PasswordSettings } from "@/features/dashboard/components/PasswordSetting";
import { ProfileSettings } from "@/features/dashboard/components/ProfileSetting";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your chef profile and account security preferences.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 max-w-7xl">
          
          {/* Left Sidebar Navigation */}
          <aside className="w-full md:w-64 shrink-0">
            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`text-left px-4 py-3 text-sm font-semibold rounded-lg transition-all border-l-4 ${
                  activeTab === "profile"
                    ? "bg-secondary/60 text-foreground border-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted border-transparent"
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`text-left px-4 py-3 text-sm font-semibold rounded-lg transition-all border-l-4 ${
                  activeTab === "password"
                    ? "bg-secondary/60 text-foreground border-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted border-transparent"
                }`}
              >
                Security & Password
              </button>
            </nav>
          </aside>

          {/* Right Content Area */}
          <div className="flex-1 max-w-2xl">
            {activeTab === "profile" ? (
              <ProfileSettings />
            ) : (
              /* Security & Password Section */
             <PasswordSettings />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}