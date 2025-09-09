"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Mokai Cyber
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <Link href="/">
                <Button 
                  variant={pathname === "/" ? "default" : "ghost"} 
                  size="sm"
                >
                  Dashboard
                </Button>
              </Link>
              <Link href="/reports">
                <Button 
                  variant={pathname === "/reports" ? "default" : "ghost"} 
                  size="sm"
                >
                  Reports
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            Essential Eight Compliance
          </div>
        </div>
      </div>
    </nav>
  )
}