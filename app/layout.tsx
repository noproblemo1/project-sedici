import { type Metadata, type Viewport } from "next";

import { cn } from "@/lib/utils";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";

import "@/styles/globals.css";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Link to Neutraface Text font */}
          <link
            href="https://fonts.cdnfonts.com/css/neutraface-text"
            rel="stylesheet"
          />
        </head>
        <body
          className={cn(
            "min-h-screen bg-background antialiased"
          )}
          style={{ fontFamily: "'Neutraface Text', sans-serif" }} // Force font family
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {/* Add padding to the entire layout */}
            <div className="relative flex min-h-screen flex-col px-4 md:px-8">
              {children}
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
