export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-inkSoft">
        <p>&copy; {new Date().getFullYear()} TaskFlow. Built with Next.js.</p>
        <p className="font-mono text-xs">v0.1.0</p>
      </div>
    </footer>
  );
}
