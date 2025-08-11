import type { TShowComment, TShowPost } from '@/types/site';
import type { TId } from '@/types/utils';

import { CommentSingle } from './comment-single';

const RenderComments = ({ postId, comment, depth }: { postId: TId; comment: TShowComment; depth: number }) => {
    return (
        <div className="space-y-4">
            <CommentSingle postId={postId} comment={comment} />
            <div className="pl-12">
                {comment.comments?.map((comment) => (
                    <RenderComments postId={postId} key={comment.id} comment={comment} depth={depth + 1} />
                ))}
            </div>
        </div>
    );
};

export const CommentsList = ({ post }: { post: TShowPost }) => {
    return (
        <div className="space-y-6">
            {post.comments?.map((comment) => (
                <RenderComments postId={post.id} key={comment.id} comment={comment} depth={0} />
            ))}
        </div>
    );
};
