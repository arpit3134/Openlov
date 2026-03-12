import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">
          OpenLov
        </Link>

        <div className="flex gap-6 text-sm">
          <Link href="/">Home</Link>
          <Link href="/ai-tools">Tools</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
    </nav>
  );
}
