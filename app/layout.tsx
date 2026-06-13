import React from "react"
import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CustomCursor } from "@/components/ui/custom-cursor"

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600"], 
  variable: '--font-cormorant',
  style: ['normal', 'italic']
});

export const metadata: Metadata = {
  title: 'Nexus Interior Studio',
  description: 'High-performance outdoor gear engineered for the modern explorer. Lightweight, durable, adventure-ready.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

import { Toaster } from "sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased cursor-none [&_*]:cursor-none`}>
        <CustomCursor />
        {children}
        <Analytics />
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
