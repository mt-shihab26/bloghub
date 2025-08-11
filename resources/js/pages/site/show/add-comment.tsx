import type { TId } from '@/types/utils';

import { useForm } from '@inertiajs/react';

import { InputError } from '@/components/elements/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export const AddComment = ({ postId, commentId }: { postId: TId; commentId?: TId }) => {
    const { data, setData, errors, post, processing } = useForm<{
        content: string;
        post_id: TId;
        comment_id: TId | null;
    }>({
        content: '',
        post_id: postId,
        comment_id: commentId || null,
    });

    return (
        <Card>
            <CardContent className="pt-6">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        post(route('site.comments.store'), { preserveScroll: true });
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
                        <Button disabled={processing}>{processing ? 'Posting...' : 'Post Comment'}</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
