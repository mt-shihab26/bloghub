import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { SiteLayout } from '@/layouts/site-layout';
import { Link } from '@inertiajs/react';
import { Bookmark, Calendar, Clock, Heart, MessageCircle, Reply, Share2, ThumbsUp } from 'lucide-react';

const blogPost = {
    id: 1,
    title: "The Future of Web Development: What's Coming in 2024",
    content: `
    <p>Web development is evolving at an unprecedented pace, and 2024 promises to bring exciting new technologies and paradigms that will reshape how we build applications for the web.</p>

    <h2>The Rise of AI-Powered Development</h2>
    <p>Artificial Intelligence is no longer just a buzzword in web development. We're seeing AI tools that can generate code, optimize performance, and even help with debugging. Tools like GitHub Copilot and ChatGPT are becoming integral parts of developers' workflows.</p>

    <h2>WebAssembly Goes Mainstream</h2>
    <p>WebAssembly (WASM) is finally reaching maturity, allowing developers to run high-performance applications in the browser using languages like Rust, C++, and Go. This opens up new possibilities for web applications that were previously impossible.</p>

    <h2>The Evolution of JavaScript Frameworks</h2>
    <p>React, Vue, and Angular continue to evolve, but we're also seeing new players like Solid.js and Qwik gaining traction. These frameworks focus on performance and developer experience, pushing the boundaries of what's possible.</p>

    <h2>Edge Computing and Serverless</h2>
    <p>The move towards edge computing is accelerating, with platforms like Vercel Edge Functions and Cloudflare Workers making it easier to deploy code closer to users for better performance.</p>
  `,
    author: {
        name: 'Sarah Chen',
        avatar: '/woman-developer.png',
        username: 'sarahchen',
        bio: 'Full-stack developer passionate about creating beautiful, functional web applications.',
    },
    publishedAt: '2024-01-15',
    readTime: '5 min read',
    likes: 124,
    comments: 18,
    tags: ['Web Development', 'Technology', 'Future'],
    image: '/futuristic-web-development.png',
};

const comments = [
    {
        id: 1,
        author: {
            name: 'Mike Johnson',
            avatar: '/man-programmer.png',
            username: 'mikej',
        },
        content:
            "Great article! I'm particularly excited about WebAssembly. Do you think it will eventually replace JavaScript for performance-critical applications?",
        publishedAt: '2 hours ago',
        likes: 12,
        replies: [
            {
                id: 2,
                author: {
                    name: 'Sarah Chen',
                    avatar: '/woman-developer.png',
                    username: 'sarahchen',
                },
                content:
                    "Thanks Mike! I don't think WASM will replace JavaScript entirely, but it will definitely complement it for specific use cases where performance is critical.",
                publishedAt: '1 hour ago',
                likes: 8,
            },
        ],
    },
    {
        id: 3,
        author: {
            name: 'Emily Rodriguez',
            avatar: '/woman-writer.png',
            username: 'emilyrod',
        },
        content:
            "The AI-powered development section really resonates with me. I've been using GitHub Copilot for a few months now and it's incredible how much it speeds up development.",
        publishedAt: '4 hours ago',
        likes: 7,
        replies: [],
    },
    {
        id: 4,
        author: {
            name: 'David Kim',
            avatar: '/man-database-engineer.png',
            username: 'davidkim',
        },
        content:
            'Edge computing is definitely the future. The performance improvements are noticeable, especially for global applications.',
        publishedAt: '6 hours ago',
        likes: 15,
        replies: [],
    },
];

const Show = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
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
        <SiteLayout title="Hello">
            <div className="container mx-auto h-full max-w-4xl px-4 py-8">
                {/* Article Header */}
                <div className="mb-8">
                    <div className="mb-4 flex flex-wrap gap-2">
                        {blogPost.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <h1 className="mb-6 text-4xl font-bold">{blogPost.title}</h1>

                    {/* Author Info */}
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={blogPost.author.avatar || '/placeholder.svg'} />
                                <AvatarFallback>{blogPost.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <Link
                                    href={`/author/${blogPost.author.username}`}
                                    className="font-semibold hover:underline"
                                >
                                    {blogPost.author.name}
                                </Link>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(blogPost.publishedAt).toLocaleDateString()}</span>
                                    <span>•</span>
                                    <Clock className="h-4 w-4" />
                                    <span>{blogPost.readTime}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" onClick={() => setIsFollowing(!isFollowing)}>
                                {isFollowing ? 'Following' : 'Follow'}
                            </Button>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <img
                        src={blogPost.image || '/placeholder.svg'}
                        alt={blogPost.title}
                        width={800}
                        height={400}
                        className="mb-8 h-64 w-full rounded-lg object-cover md:h-96"
                    />
                </div>

                {/* Article Content */}
                <div className="prose prose-lg mb-8 max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
                </div>

                {/* Article Actions */}
                <div className="flex items-center justify-between border-y py-6">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            onClick={() => setIsLiked(!isLiked)}
                            className={isLiked ? 'text-red-500' : ''}
                        >
                            <Heart className="mr-2 h-5 w-5" />
                            {blogPost.likes + (isLiked ? 1 : 0)}
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link href="#comments">
                                <MessageCircle className="mr-2 h-5 w-5" />
                                {blogPost.comments}
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => setIsBookmarked(!isBookmarked)}
                            className={isBookmarked ? 'text-blue-500' : ''}
                        >
                            <Bookmark className="mr-2 h-5 w-5" />
                            {isBookmarked ? 'Saved' : 'Save'}
                        </Button>
                    </div>
                    <Button variant="ghost">
                        <Share2 className="mr-2 h-5 w-5" />
                        Share
                    </Button>
                </div>

                {/* Author Bio */}
                <Card className="my-8">
                    <CardContent className="pt-6">
                        <div className="flex items-start space-x-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={blogPost.author.avatar || '/placeholder.svg'} />
                                <AvatarFallback>{blogPost.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <h3 className="mb-2 text-xl font-semibold">
                                    <Link href={`/author/${blogPost.author.username}`} className="hover:underline">
                                        {blogPost.author.name}
                                    </Link>
                                </h3>
                                <p className="mb-4 text-muted-foreground">{blogPost.author.bio}</p>
                                <Button variant="outline" onClick={() => setIsFollowing(!isFollowing)}>
                                    {isFollowing ? 'Following' : 'Follow'}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Comments Section */}
                <div id="comments" className="space-y-6">
                    <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>

                    {/* Add Comment */}
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
                                                    <span className="text-sm text-muted-foreground">
                                                        {comment.publishedAt}
                                                    </span>
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
                                                            className={
                                                                likedComments.has(reply.id) ? 'text-red-500' : ''
                                                            }
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
            </div>
        </SiteLayout>
    );
};

export default Show;
