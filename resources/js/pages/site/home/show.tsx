import type { TShowPost } from '@/types/home';

import { useHomeShowStore } from '@/states/use-home-show-store';

import { SiteLayout } from '@/layouts/site-layout';
import { Actions } from '@/components/screens/home/show/actions';
import { AuthorBio } from '@/components/screens/home/show/author-bio';
import { Back } from '@/components/screens/home/show/back';
import { CommentForm } from '@/components/screens/home/show/comment-form';
import { CommentsList } from '@/components/screens/home/show/comments-list';
import { Content } from '@/components/screens/home/show/content';
import { Header } from '@/components/screens/home/show/header';
import { ZenMode } from '@/components/screens/home/show/zen-mode';

const Show = ({ post }: { post: TShowPost }) => {
    const { isZenMode, setIsZenMode } = useHomeShowStore();

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
