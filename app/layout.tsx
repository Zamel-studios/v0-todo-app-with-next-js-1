import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { QueryProvider } from "@/lib/query-client"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo app built with Next.js",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <QueryProvider>{children}</QueryProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
