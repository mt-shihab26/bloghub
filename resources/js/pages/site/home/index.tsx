import type { TCategory, TPost, TTag, TUser } from '@/types/models';

import { SiteLayout } from '@/layouts/site-layout';
import { Categories } from './categories';
import { FeaturedArticles } from './featured-articles';
import { NewsletterSignup } from './newsletter-signup';
import { PopularAuthors } from './popular-authors';
import { PopularTags } from './popular-tags';
import { RecommendedArticles } from './recommended-articles';

const Index = ({
    posts,
    users,
    categories,
    tags,
}: {
    posts: TPost[];
    users: TUser[];
    categories: TCategory[];
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
