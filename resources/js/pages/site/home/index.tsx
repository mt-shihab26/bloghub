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
            {/* Full viewport height grid container */}
            <div className="grid h-[calc(100vh-4rem)] grid-cols-1 gap-8 lg:grid-cols-5">
                {/* Left Sidebar: scrollable */}
                <aside className="scrollbar-hide h-full space-y-6 overflow-y-auto lg:col-span-1">
                    <TrendingTopics />
                    <PopularAuthors />
                </aside>

                {/* Main Content: scrollable */}
                <main className="scrollbar-hide h-full overflow-y-auto lg:col-span-3">
                    <FeaturedArticles posts={posts} />
                    <RecommendedArticles />
                </main>

                {/* Right Sidebar: scrollable */}
                <aside className="scrollbar-hide h-full space-y-6 overflow-y-auto lg:col-span-1">
                    <Categories />
                    <PopularTags />
                    <NewsletterSignup />
                </aside>
            </div>
        </SiteLayout>
    );
};

export default Index;
