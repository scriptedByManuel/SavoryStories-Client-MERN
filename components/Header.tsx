"use client";
import { useDarkModeStore } from "@/stores/useDarkModeStore";
import {
  ChefHat,
  LayoutDashboard,
  LogOut,
  Moon,
  Settings,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useProfileStore } from "@/stores/useProfileStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import authService from "@/services/authService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { chef, logout: clearUser } = useProfileStore();
  const { logout } = authService;
  const { isDark, toggleDarkMode } = useDarkModeStore();

  const handleLogout = async () => {
    await logout();
    router.push("/");
    clearUser();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background h-16">
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          {/* Logo Placeholder */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-muted animate-pulse" />
            <div className="h-6 w-32 bg-muted rounded animate-pulse" />
          </div>
          {/* Navigation/Buttons Placeholder */}
          <div className="flex gap-4">
            <div className="h-8 w-20 bg-muted rounded animate-pulse hidden md:block" />
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
          </div>
        </div>
      </header>
    );
  }

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
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            title="Toggle dark mode"
            className="hover:[&_svg]:text-white transition-colors"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle dark mode</span>
          </Button>

          {chef ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full p-0"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${chef.avatar}`}
                      alt={chef.name}
                    />
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
                    <p className="text-sm font-medium leading-none">
                      {chef.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {chef.email}
                    </p>
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
                  <Link href={"/dashboard/settings"} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
