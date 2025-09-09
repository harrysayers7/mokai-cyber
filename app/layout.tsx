import { Inter as FontSans } from "next/font/google"
import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { Navigation } from "@/components/navigation"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: "Mokai Cyber - Essential Eight Compliance Dashboard",
  description: "Australian Government Essential Eight compliance tracking and reporting",
  keywords: [
    "Essential Eight",
    "Cybersecurity",
    "Australian Government",
    "Compliance",
    "Mokai Cyber",
  ],
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Navigation />
        {children}
      </body>
    </html>
  )
}