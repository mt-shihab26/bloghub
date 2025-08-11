import type { TShowPost } from '@/types/site';

import { SiteLayout } from '@/layouts/site-layout';

import { Actions } from './actions';
import { AuthorBio } from './author-bio';
import { Comments } from './comments';
import { Content } from './content';
import { Header } from './header';

const Show = ({ post }: { post: TShowPost }) => {
    return (
        <SiteLayout title={post.title}>
            <div className="container mx-auto h-full max-w-4xl px-4 py-8">
                <Header post={post} />
                <Content post={post} />
                <Actions post={post} />
                <AuthorBio post={post} />
                <Comments post={post} />
            </div>
        </SiteLayout>
    );
};

export default Show;
