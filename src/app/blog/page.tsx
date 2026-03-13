import { blogs } from '../../data/blogs';

export default function BlogPage() {
  return (
    <div className="max-w-2xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-serif font-bold mb-10">Stories</h1>
      {blogs.length > 0 ? (
        <p>Blogs will appear here...</p>
      ) : (
        <div className="text-center py-20 border-t border-b border-gray-100">
          <p className="text-gray-400 italic font-serif text-xl">Coming soon to Openlov...</p>
        </div>
      )}
    </div>
  );
}
