import type { TShowPost } from '@/types/site';

import { CommentForm } from './comment-form';
import { CommentsList } from './comments-list';

export const Comments = ({ post }: { post: TShowPost }) => {
    return (
        <div id="comments" className="space-y-6">
            <h2 className="text-2xl font-bold">Comments ({post.comments?.length})</h2>
            <CommentForm postId={post.id} />
            <CommentsList post={post} />
        </div>
    );
};
