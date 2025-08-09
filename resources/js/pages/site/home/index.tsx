import type { TPost } from '@/types/models';

import { SiteLayout } from '@/layouts/site-layout';
import { Categories } from './categories';
import { FeaturedArticles } from './featured-articles';
import { NewsletterSignup } from './newsletter-signup';
import { PopularAuthors } from './popular-authors';
import { PopularTags } from './popular-tags';
import { RecommendedArticles } from './recommended-articles';
import { TrendingTopics } from './trending-topics';

const Index = ({ posts }: { posts: TPost[] }) => {
    return (
        <SiteLayout title="Home" footer={false}>
            {/* Full viewport height grid container */}
            <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-5">
                {/* Left Sidebar: scrollable */}
                <aside className="scrollbar-hide h-full space-y-6 overflow-y-auto lg:col-span-1">
                    <TrendingTopics />
                    <PopularAuthors />
                </aside>

                {/* Main Content: scrollable */}
                <main className="scrollbar-hide h-full overflow-y-auto lg:col-span-3">
                    <FeaturedArticles posts={posts} />
                    <RecommendedArticles posts={posts} />
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
