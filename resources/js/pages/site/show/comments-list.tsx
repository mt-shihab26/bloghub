import type { TShowPost } from '@/types/site';

import { CommentSingle } from './comment-single';

export const CommentsList = ({ post }: { post: TShowPost }) => {
    return (
        <div className="space-y-6">
            {post.comments?.map((comment) => (
                <div key={comment.id} className="space-y-4">
                    <CommentSingle comment={comment} />
                    {comment.comments?.map((reply) => (
                        <div key={reply.id} className="ml-12">
                            <CommentSingle comment={reply} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
