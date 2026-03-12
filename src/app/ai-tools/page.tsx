import React from 'react';
import { tools } from '@/data/tools';
import { ToolCard } from '@/components/cards/ToolCard';

export default function AiToolsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col mb-10">
        <h1 className="text-4xl font-bold mb-4">AI Tools Directory</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover the best AI tools to enhance your workflow.
        </p>
      </div>

      {tools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No tools found.</p>
        </div>
      )}
    </div>
  );
}

