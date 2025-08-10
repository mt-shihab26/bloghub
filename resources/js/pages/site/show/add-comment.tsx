import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export const AddComment = () => {
    const [newComment, setNewComment] = useState('');
    const [likedComments, setLikedComments] = useState<Set<number>>(new Set());

    const handleCommentLike = (commentId: number) => {
        setLikedComments((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(commentId)) {
                newSet.delete(commentId);
            } else {
                newSet.add(commentId);
            }
            return newSet;
        });
    };

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <Textarea
                        placeholder="Share your thoughts..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[100px]"
                    />
                    <div className="flex justify-end">
                        <Button>Post Comment</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
