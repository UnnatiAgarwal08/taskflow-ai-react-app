import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TaskProvider } from "@/context/TaskContext";

export const metadata = {
  title: "TaskFlow",
  description: "A simple, focused task manager built with Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-body">
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
