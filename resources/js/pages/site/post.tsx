import type { TShowPost } from '@/types/home';

import { usePostStore } from '@/states/use-post-store';

import { SiteLayout } from '@/layouts/site-layout';
import { Actions } from '@/components/screens/post/actions';
import { AuthorBio } from '@/components/screens/post/author-bio';
import { Back } from '@/components/screens/post/back';
import { CommentForm } from '@/components/screens/post/comment-form';
import { CommentsList } from '@/components/screens/post/comments-list';
import { Content } from '@/components/screens/post/content';
import { Header } from '@/components/screens/post/header';
import { ZenMode } from '@/components/screens/post/zen-mode';

const Show = ({ post }: { post: TShowPost }) => {
    const { isZenMode, setIsZenMode } = usePostStore();

    return (
        <SiteLayout title={post.title} header={!isZenMode} footer={!isZenMode} className="py-16">
            <div className="flex justify-between">
                <Back />
                <ZenMode value={isZenMode} onClick={() => setIsZenMode(!isZenMode)} />
            </div>
            <div className="container mx-auto h-full max-w-4xl px-4">
                <Header post={post} />
                <Content post={post} />
                {!isZenMode && (
                    <>
                        <Actions post={post} />
                        <AuthorBio post={post} />
                        <div id="comments" className="space-y-6">
                            <h2 className="text-2xl font-bold">Comments ({post.comments_count})</h2>
                            <CommentForm postId={post.id} />
                            <CommentsList post={post} />
                        </div>
                    </>
                )}
            </div>
        </SiteLayout>
    );
};

export default Show;
