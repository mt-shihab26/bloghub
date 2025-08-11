import type { TShowPost } from '@/types/home';

import { useState } from 'react';

import { SiteLayout } from '@/layouts/site-layout';

import { Actions } from './actions';
import { AuthorBio } from './author-bio';
import { Back } from './back';
import { CommentForm } from './comment-form';
import { CommentsList } from './comments-list';
import { Content } from './content';
import { Header } from './header';
import { ZenMode } from './zen-mode';

const Show = ({ post }: { post: TShowPost }) => {
    const [isZenMode, setIsZenMode] = useState<boolean>(false);

    const toggleZenMode = () => {
        setIsZenMode(!isZenMode);
    };

    return (
        <SiteLayout title={post.title} header={!isZenMode} footer={!isZenMode} className="py-16">
            <div className="flex justify-between">
                <Back />
                <ZenMode value={isZenMode} onClick={toggleZenMode} />
            </div>
            <div className="container mx-auto h-full max-w-4xl px-4">
                <Header post={post} />
                <Content post={post} />
                <Actions post={post} />
                {!isZenMode && (
                    <>
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
