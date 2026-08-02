import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center text-center gap-6 py-16">
      <span className="font-mono text-xs uppercase tracking-widest text-accent bg-accentSoft px-3 py-1 rounded-full">
        Welcome
      </span>

      <h1 className="font-display font-bold text-4xl sm:text-5xl text-ink max-w-2xl">
        Get your tasks in order, one step at a time.
      </h1>

      <p className="text-inkSoft max-w-xl text-base sm:text-lg">
        TaskFlow is a small, focused task manager: add what you need to do,
        track what&apos;s pending, and see what you&apos;ve finished — all in
        one clean workspace.
      </p>

      <Link
        href="/dashboard"
        className="mt-2 bg-accent text-white font-medium px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
      >
        Get Started
      </Link>
    </section>
  );
}
