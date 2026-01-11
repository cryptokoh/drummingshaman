import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import { ThemeProvider } from "./providers";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Drumming Shaman | Anap Pandey",
  description: "Experience the transformative power of shamanic drumming with Anap Pandey. Healing ceremonies, workshops, and spiritual guidance at The Healing Temple and The Healing Vortex.",
  keywords: ["shamanic drumming", "healing", "spiritual", "ceremony", "Anap Pandey", "Healing Temple", "Healing Vortex"],
  openGraph: {
    title: "The Drumming Shaman | Anap Pandey",
    description: "Experience transformative shamanic drumming ceremonies",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cinzel.variable} ${inter.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
