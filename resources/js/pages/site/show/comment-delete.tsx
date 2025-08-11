import type { TComment } from '@/types/models';

import { DeleteConfirm } from '@/components/elements/delete-confirm';

export const CommentDelete = ({ comment }: { comment: TComment }) => (
    <DeleteConfirm
        route={route('site.comments.destroy', comment)}
        title="Delete Comment"
        description="Are you sure you want to delete this comment? This action cannot be undone."
    />
);
