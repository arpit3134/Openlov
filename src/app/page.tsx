export default function Home() {
  return (
    <main style={{padding:"40px"}}>
      <h1>Openlov</h1>
      <p>Discover the best AI tools and guides.</p>

      <section style={{marginTop:"40px"}}>
        <h2>Popular Sections</h2>

        <div style={{display:"flex", gap:"20px", marginTop:"20px"}}>
          
          <div style={{border:"1px solid #ddd", padding:"20px"}}>
            <h3>AI Tools</h3>
            <p>Explore useful AI tools.</p>
            <a href="/tools">Open Tools</a>
          </div>

          <div style={{border:"1px solid #ddd", padding:"20px"}}>
            <h3>Blog</h3>
            <p>Read AI guides and tutorials.</p>
            <a href="/blog">Read Blog</a>
          </div>

          <div style={{border:"1px solid #ddd", padding:"20px"}}>
            <h3>About</h3>
            <p>Learn about Openlov.</p>
            <a href="/about">About Us</a>
          </div>

        </div>
      </section>
    </main>
  );
}
