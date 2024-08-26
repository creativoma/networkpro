'use client'

import Link from 'next/link'
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Sun, Moon } from 'lucide-react'

export function Footer() {
  const { theme, setTheme } = useTheme()

  return (
    <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2024 NetworkPro. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              Privacy Policy
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
            <Moon className="h-4 w-4" />
          </div>
        </div>
      </div>
    </footer>
  )
}