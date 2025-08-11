import type { TShowPost } from '@/types/site';

import { SiteLayout } from '@/layouts/site-layout';

import { Actions } from './actions';
import { AuthorBio } from './author-bio';
import { Back } from './back';
import { CommentForm } from './comment-form';
import { CommentsList } from './comments-list';
import { Content } from './content';
import { Header } from './header';

const Show = ({ post }: { post: TShowPost }) => {
    return (
        <SiteLayout title={post.title}>
            <Back />
            <div className="container mx-auto h-full max-w-4xl px-4">
                <Header post={post} />
                <Content post={post} />
                <Actions post={post} />
                <AuthorBio post={post} />
                <div id="comments" className="space-y-6">
                    <h2 className="text-2xl font-bold">Comments ({post.comments?.length})</h2>
                    <CommentForm postId={post.id} />
                    <CommentsList post={post} />
                </div>
            </div>
        </SiteLayout>
    );
};

export default Show;
