import { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedStories } from '@/components/home/FeaturedStories';
import { TrendingTopics } from '@/components/home/TrendingTopics';
import { CollectionsSection } from '@/components/home/CollectionsSection';
import { ArticlesFeed } from '@/components/home/ArticlesFeed';
import { ResourcesSection } from '@/components/home/ResourcesSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `${siteConfig.name} - Intelligent Content Discovery`,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <div data-testid="home-page">
      <HeroSection />
      <FeaturedStories />
      <TrendingTopics />
      <CollectionsSection />
      <ArticlesFeed />
      <ResourcesSection />
      <NewsletterSection />
    </div>
  );
}
