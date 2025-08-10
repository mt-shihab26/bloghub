import type { TShowComment, TShowPost } from '@/types/site';

import { CommentSingle } from './comment-single';

const RenderComments = ({ comment, depth }: { comment: TShowComment; depth: number }) => {
    return (
        <div className="space-y-4">
            <CommentSingle comment={comment} />
            <div className="pl-12">
                {comment.comments?.map((comment) => (
                    <RenderComments key={comment.id} comment={comment} depth={depth + 1} />
                ))}
            </div>
        </div>
    );
};

export const CommentsList = ({ post }: { post: TShowPost }) => {
    return (
        <div className="space-y-6">
            {post.comments?.map((comment) => (
                <RenderComments key={comment.id} comment={comment} depth={0} />
            ))}
        </div>
    );
};
