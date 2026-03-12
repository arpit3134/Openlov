export default function Header() {
  return (
    <header style={{padding:"15px", borderBottom:"1px solid #ddd"}}>
      <nav style={{display:"flex", gap:"20px"}}>
        <a href="/">Home</a>
        <a href="/tools">Tools</a>
        <a href="/blog">Blog</a>
        <a href="/about">About</a>
      </nav>
    </header>
  );
}
