import { Metadata } from 'next';
import Link from 'next/link';
import { tools } from '@/data/tools';
import { blogs } from '@/data/blog';
import { ToolCard } from '@/components/cards/ToolCard';
import { BlogCard } from '@/components/cards/BlogCard';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';
import { CATEGORIES } from '@/lib/constants';
import { getFeaturedTools } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Home',
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function Home() {
  const featuredTools = getFeaturedTools(tools, 6);
  const latestBlogs = blogs.slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="page-title mb-6">
              Discover the Best AI Tools for Your Projects
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore curated AI tools, resources, and insights. Find the perfect solution for
              your needs with our comprehensive directory and expert blog.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/tools">
                <Button size="lg">Browse Tools</Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  Read Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container">
          <h2 className="section-title mb-4 text-center">Popular Categories</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Explore AI tools organized by category to find exactly what you need
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map(category => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <div className="p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition text-center cursor-pointer">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{category.count} tools</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container">
          <div className="mb-12">
            <h2 className="section-title mb-4">Featured AI Tools</h2>
            <p className="text-gray-600 max-w-2xl">
              Hand-picked tools that stand out for their quality, innovation, and impact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/tools">
              <Button variant="secondary">View All Tools</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-16 px-4">
        <div className="container">
          <div className="mb-12">
            <h2 className="section-title mb-4">Latest from the Blog</h2>
            <p className="text-gray-600 max-w-2xl">
              Stay updated with the latest AI trends, tutorials, and insights.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestBlogs.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/blog">
              <Button variant="secondary">Read More Articles</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 px-4 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Found a Tool Worth Sharing?</h2>
            <p className="text-blue-100 mb-8">
              Submit your favorite AI tool to our directory and help others discover it.
            </p>
            <Link href="/submit-tool">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Submit a Tool
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
