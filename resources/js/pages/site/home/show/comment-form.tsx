import type { TComment } from '@/types/models';
import type { TId } from '@/types/utils';

import { useForm } from '@inertiajs/react';

import { InputError } from '@/components/elements/input-error';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export const CommentForm = ({ postId, commentId, comment }: { postId: TId; commentId?: TId; comment?: TComment }) => {
    const { data, setData, errors, post, patch, processing } = useForm<{
        content: string;
        post_id: TId;
        comment_id: TId | null;
    }>({
        content: comment?.content || '',
        post_id: comment?.post_id || postId,
        comment_id: comment?.comment_id || commentId || null,
    });

    return (
        <div className="overflow-hidden rounded-lg border">
            <div className="px-6 pt-6 pb-6">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (comment) {
                            patch(route('site.comments.update', comment), {
                                preserveScroll: true,
                                preserveState: false,
                            });
                            return;
                        }
                        post(route('site.comments.store'), {
                            preserveScroll: true,
                            preserveState: false,
                        });
                    }}
                    className="space-y-4"
                >
                    <Textarea
                        placeholder="Share your thoughts..."
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        className="min-h-[100px]"
                    />
                    <InputError message={errors.content} />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing
                                ? comment
                                    ? 'Updating..'
                                    : 'Posting...'
                                : comment
                                  ? 'Update Comment'
                                  : 'Post Comment'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
