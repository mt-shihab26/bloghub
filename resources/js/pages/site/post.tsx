import type { TShowPost } from '@/types/home';

import { usePostStore } from '@/states/use-post-store';
import { useAuthUser } from '@/hooks/use-auth-user';

import { Link } from '@inertiajs/react';
import { SiteLayout } from '@/layouts/site-layout';
import { Actions } from '@/components/screens/post/actions';
import { AuthorBio } from '@/components/screens/post/author-bio';
import { Back } from '@/components/screens/post/back';
import { CommentForm } from '@/components/screens/post/comment-form';
import { CommentsList } from '@/components/screens/post/comments-list';
import { Content } from '@/components/screens/post/content';
import { Header } from '@/components/screens/post/header';
import { ZenMode } from '@/components/screens/post/zen-mode';
import { Button } from '@/components/ui/button';
import { PostStatus } from '@/components/composite/post-status';
import { Edit } from 'lucide-react';

const Show = ({ post }: { post: TShowPost }) => {
    const { isZenMode, setIsZenMode } = usePostStore();
    const { user } = useAuthUser();

    return (
        <SiteLayout title={post.title} header={!isZenMode} footer={!isZenMode} className="py-16">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <Back />
                </div>
                <div className="flex items-center gap-2">
                    <PostStatus post={post} />
                    {user && user.id === post.user.id && (
                        <Button variant="outline" size="sm" asChild>
                            <Link href={route('site.write.edit', { post })}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </Button>
                    )}
                    <ZenMode value={isZenMode} onClick={() => setIsZenMode(!isZenMode)} />
                </div>
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
