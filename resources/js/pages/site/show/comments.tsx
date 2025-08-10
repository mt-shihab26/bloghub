import type { TShowPost } from '@/types/site';

import { useState } from 'react';
import { comments } from './data';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Reply, ThumbsUp } from 'lucide-react';

import { AddComment } from './add-comment';

export const Comments = ({ post }: { post: TShowPost }) => {
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
        <div id="comments" className="space-y-6">
            <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>

            {/* Add Comment */}
            <AddComment />

            {/* Comments List */}
            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="space-y-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-start space-x-4">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={comment.author.avatar || '/placeholder.svg'} />
                                        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center space-x-2">
                                            <Link
                                                href={`/author/${comment.author.username}`}
                                                className="font-semibold hover:underline"
                                            >
                                                {comment.author.name}
                                            </Link>
                                            <span className="text-sm text-muted-foreground">{comment.publishedAt}</span>
                                        </div>
                                        <p className="mb-4">{comment.content}</p>
                                        <div className="flex items-center space-x-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleCommentLike(comment.id)}
                                                className={likedComments.has(comment.id) ? 'text-red-500' : ''}
                                            >
                                                <ThumbsUp className="mr-1 h-4 w-4" />
                                                {comment.likes + (likedComments.has(comment.id) ? 1 : 0)}
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Reply className="mr-1 h-4 w-4" />
                                                Reply
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Replies */}
                        {comment.replies.map((reply) => (
                            <div key={reply.id} className="ml-12">
                                <Card>
                                    <CardContent className="pt-4">
                                        <div className="flex items-start space-x-4">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={reply.author.avatar || '/placeholder.svg'} />
                                                <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="mb-2 flex items-center space-x-2">
                                                    <Link
                                                        href={`/author/${reply.author.username}`}
                                                        className="text-sm font-semibold hover:underline"
                                                    >
                                                        {reply.author.name}
                                                    </Link>
                                                    <span className="text-xs text-muted-foreground">
                                                        {reply.publishedAt}
                                                    </span>
                                                </div>
                                                <p className="mb-2 text-sm">{reply.content}</p>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleCommentLike(reply.id)}
                                                    className={likedComments.has(reply.id) ? 'text-red-500' : ''}
                                                >
                                                    <ThumbsUp className="mr-1 h-3 w-3" />
                                                    {reply.likes + (likedComments.has(reply.id) ? 1 : 0)}
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
