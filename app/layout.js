import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TaskProvider } from "@/context/TaskContext";
import {
  Inter,
  Space_Grotesk,
  JetBrains_Mono,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "TaskFlow",
  description: "A simple, focused task manager built with Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} min-h-screen flex flex-col font-body`}
      >
        <TaskProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
            {children}
          </main>
          <Footer />
        </TaskProvider>
      </body>
    </html>
  );
}