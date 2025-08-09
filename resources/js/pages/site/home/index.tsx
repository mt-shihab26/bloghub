import type { TPost } from '@/types/models';

import { Categories } from '@/components/screens/home/categories';
import { FeaturedArticles } from '@/components/screens/home/featured-articles';
import { NewsletterSignup } from '@/components/screens/home/newsletter-signup';
import { PopularAuthors } from '@/components/screens/home/popular-authors';
import { PopularTags } from '@/components/screens/home/popular-tags';
import { RecommendedArticles } from '@/components/screens/home/recommended-articles';
import { TrendingTopics } from '@/components/screens/home/trending-topics';
import { SiteLayout } from '@/layouts/site-layout';

const Index = ({ posts }: { posts: TPost[] }) => {
    return (
        <SiteLayout title="Home">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                <div className="lg:col-span-3">
                    <FeaturedArticles posts={posts} />
                    <RecommendedArticles />
                </div>
                <div className="space-y-6">
                    <TrendingTopics />
                    <PopularAuthors />
                    <Categories />
                    <PopularTags />
                    <NewsletterSignup />
                </div>
            </div>
        </SiteLayout>
    );
};

export default Index;
