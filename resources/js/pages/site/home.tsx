import type { TActiveDiscussionPost, TIndexCategory, TIndexPost } from '@/types/home';
import type { TTag } from '@/types/models';

import { ActiveDiscussions } from '@/components/screens/home/active-discussions';
import { Categories } from '@/components/screens/home/categories';
import { FeaturedArticles } from '@/components/screens/home/featured-articles';
import { PopularTags } from '@/components/screens/home/popular-tags';
import { RecommendedArticles } from '@/components/screens/home/recommended-articles';
import { SiteLayout } from '@/layouts/site-layout';

const Index = ({
    posts,
    categories,
    tags,
    activeDiscussions,
}: {
    posts: TIndexPost[];
    categories: TIndexCategory[];
    tags: TTag[];
    activeDiscussions: TActiveDiscussionPost[];
}) => {
    return (
        <SiteLayout title="Home" footer={false}>
            <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-8">
                <aside className="scrollbar-hide h-full space-y-6 overflow-y-auto lg:col-span-2">
                    <Categories categories={categories} />
                    <PopularTags tags={tags} />
                </aside>
                <main className="scrollbar-hide h-full overflow-y-auto lg:col-span-4">
                    <FeaturedArticles posts={posts} />
                    <RecommendedArticles posts={posts} />
                </main>
                <aside className="scrollbar-hide h-full space-y-6 overflow-y-auto lg:col-span-2">
                    <ActiveDiscussions posts={activeDiscussions} />
                </aside>
            </div>
        </SiteLayout>
    );
};

export default Index;
