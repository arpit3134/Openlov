import { tools } from '@/data/tools';
import { notFound } from 'next/navigation';

export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  const tool = tools.find(t => t.id === params.slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold">{tool.name}</h1>
      <p className="mt-4">{tool.description}</p>
    </div>
  );
}
