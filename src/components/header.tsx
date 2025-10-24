"use client";

import { useState } from "react";
import { AlertCircle, Menu, PlaneTakeoffIcon, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import AvatarDropdownComponent from "./avatar-dropdown";
import { authClient } from "@/lib/auth-client";

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const session = authClient.useSession();

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <PlaneTakeoffIcon className="h-6 w-6 text-[#12A3ED]" />
            <h1 className="ml-2 text-lg font-bold text-gray-900">TravelAi</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-[#12A3ED] transition-colors"
            >
              Home
            </Link>

            {session.data?.user?.id ? (
              <>
                <Link
                  href={`/user/my-trips/${session.data.user.id}`}
                  className="text-gray-700 hover:text-[#12A3ED] transition-colors"
                >
                  My Trips
                </Link>
                <Link
                  href="/trip/create"
                  className="text-gray-700 hover:text-[#12A3ED] transition-colors"
                >
                  Create
                </Link>
              </>
            ) : (
              <>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="text-gray-400 cursor-default">
                      My Trips
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-72 p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          Sign in required
                        </h4>
                        <p className="text-gray-600 text-sm mt-1">
                          To access this feature, please sign in to your account
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="text-gray-400 cursor-default">Create</span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-72 p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          Sign in required
                        </h4>
                        <p className="text-gray-600 text-sm mt-1">
                          To access this feature, please sign in to your account
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#12A3ED] focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Auth/Profile */}
          <div className="hidden md:block">
            {session.data?.user ? (
              <AvatarDropdownComponent
                name={session.data.user.name}
                image={session.data.user.image || null}
              />
            ) : (
              <Button
                className="bg-[#12A3ED] hover:bg-[#0E8DD0] transition-colors"
                asChild
              >
                <Link href="/signin">Login</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {session.data?.user?.id ? (
              <>
                <Link
                  href={`/user/my-trips/${session.data.user.id}`}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Trips
                </Link>
                <Link
                  href="/trip/create"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create
                </Link>
              </>
            ) : (
              <div className="px-3 py-2">
                <p className="text-sm text-gray-500 mb-2">
                  Sign in to access all features
                </p>
                <Button
                  className="w-full bg-[#12A3ED] hover:bg-[#0E8DD0]"
                  asChild
                >
                  <Link href="/signin">Login / Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
