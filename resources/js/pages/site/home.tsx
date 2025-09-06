import type { TIndexCategory, TIndexPost, TIndexUser } from '@/types/home';
import type { TTag } from '@/types/models';

import { SiteLayout } from '@/layouts/site-layout';
import { Categories } from '@/components/screens/home/categories';
import { FeaturedArticles } from '@/components/screens/home/featured-articles';
import { NewsletterSignup } from '@/components/screens/home/newsletter-signup';
import { PopularAuthors } from '@/components/screens/home/popular-authors';
import { PopularTags } from '@/components/screens/home/popular-tags';
import { RecommendedArticles } from '@/components/screens/home/recommended-articles';

const Index = ({
    posts,
    users,
    categories,
    tags,
}: {
    posts: TIndexPost[];
    categories: TIndexCategory[];
    users: TIndexUser[];
    tags: TTag[];
}) => {
    return (
        <SiteLayout title="Home" footer={false}>
            <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-5">
                <aside className="scrollbar-hide h-full space-y-6 overflow-y-auto lg:col-span-1">
                    <Categories categories={categories} />
                    <PopularAuthors users={users} />
                </aside>
                <main className="scrollbar-hide h-full overflow-y-auto lg:col-span-3">
                    <FeaturedArticles posts={posts} />
                    <RecommendedArticles posts={posts} />
                </main>
                <aside className="scrollbar-hide h-full space-y-6 overflow-y-auto lg:col-span-1">
                    <PopularTags tags={tags} />
                    <NewsletterSignup />
                </aside>
            </div>
        </SiteLayout>
    );
};

export default Index;
