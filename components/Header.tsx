"use client";
import { useDarkModeStore } from "@/stores/useDarkModeStore";
import { ChefHat, LayoutDashboard, LogOut, Moon, Sun, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useProfileStore } from "@/stores/useProfileStore";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
  const { chef, logout } = useProfileStore();
  const { isDark, toggleDarkMode } = useDarkModeStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <ChefHat className={`h-6 w-6 text-primary`} />
          <div className="text-xl md:text-2xl font-bold text-primary">
            Savory Stories
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/recipes"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Recipes
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
           <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            title="Toggle dark mode"
            className="hover:[&_svg]:text-white transition-colors"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle dark mode</span>
          </Button>

          {chef ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={chef.avatar || "/placeholder.svg"} alt={chef.name} />
                    <AvatarFallback>
                      {chef.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{chef.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{chef.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/chef/${chef.id}`} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-destructive focus:text-destructive pointer-events-auto"
                  style={{ background: "none" }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link href="/login">Chef Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Join as Chef</Link>
              </Button>
            </div>
          )
        }
        </div>
      </div>
    </header>
  );
};

export default Header;
