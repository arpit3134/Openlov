import { Metadata } from 'next';
import { topics } from '@/data/topics';
import { TopicChip } from '@/components/topic/TopicChip';

export const metadata: Metadata = {
  title: 'Topics',
  description: 'Browse all topics and find content that interests you.',
};

export default function TopicsPage() {
  return (
    <div className="min-h-screen" data-testid="topics-page">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Topics
            </h1>
            <p className="text-lg text-foreground-secondary">
              Explore content organized by subject. Find the topics that match your interests and dive deep.
            </p>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <TopicChip key={topic.id} topic={topic} variant="large" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
