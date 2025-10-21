import type { TIndexCategory, TIndexDiscussion, TIndexPost } from '@/types/home';
import type { TTag } from '@/types/models';

import { ArticleCard } from '@/components/screens/home/article-card';
import { Categories } from '@/components/screens/home/categories';
import { Discussions } from '@/components/screens/home/discussions';
import { Filters } from '@/components/screens/home/filters';
import { Tags } from '@/components/screens/home/tags';
import { SiteLayout } from '@/layouts/site-layout';

const Index = ({
    posts,
    categories,
    tags,
    discussions,
}: {
    posts: TIndexPost[];
    categories: TIndexCategory[];
    tags: TTag[];
    discussions: TIndexDiscussion[];
}) => {
    return (
        <SiteLayout title="Home">
            <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-8">
                <aside className="h-full space-y-6 lg:col-span-2">
                    <Categories categories={categories} />
                    <Tags tags={tags} />
                </aside>
                <main className="h-full lg:col-span-4">
                    <Filters />
                    <div className="space-y-6">
                        {posts.map((post) => (
                            <ArticleCard key={post.id} post={post} />
                        ))}
                    </div>
                </main>
                <aside className="h-full space-y-6 lg:col-span-2">
                    <Discussions posts={discussions} />
                </aside>
            </div>
        </SiteLayout>
    );
};

export default Index;
