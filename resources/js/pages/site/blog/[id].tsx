import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Heart, MessageCircle, Bookmark, Share2, Clock, Calendar, User, ThumbsUp, Reply } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

// Mock blog post data
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
    name: "Sarah Chen",
    avatar: "/woman-developer.png",
    username: "sarahchen",
    bio: "Full-stack developer passionate about creating beautiful, functional web applications."
  },
  publishedAt: "2024-01-15",
  readTime: "5 min read",
  likes: 124,
  comments: 18,
  tags: ["Web Development", "Technology", "Future"],
  image: "/futuristic-web-development.png"
}

const comments = [
  {
    id: 1,
    author: {
      name: "Mike Johnson",
      avatar: "/man-programmer.png",
      username: "mikej"
    },
    content: "Great article! I'm particularly excited about WebAssembly. Do you think it will eventually replace JavaScript for performance-critical applications?",
    publishedAt: "2 hours ago",
    likes: 12,
    replies: [
      {
        id: 2,
        author: {
          name: "Sarah Chen",
          avatar: "/woman-developer.png",
          username: "sarahchen"
        },
        content: "Thanks Mike! I don't think WASM will replace JavaScript entirely, but it will definitely complement it for specific use cases where performance is critical.",
        publishedAt: "1 hour ago",
        likes: 8
      }
    ]
  },
  {
    id: 3,
    author: {
      name: "Emily Rodriguez",
      avatar: "/woman-writer.png",
      username: "emilyrod"
    },
    content: "The AI-powered development section really resonates with me. I've been using GitHub Copilot for a few months now and it's incredible how much it speeds up development.",
    publishedAt: "4 hours ago",
    likes: 7,
    replies: []
  },
  {
    id: 4,
    author: {
      name: "David Kim",
      avatar: "/man-database-engineer.png",
      username: "davidkim"
    },
    content: "Edge computing is definitely the future. The performance improvements are noticeable, especially for global applications.",
    publishedAt: "6 hours ago",
    likes: 15,
    replies: []
  }
]

export default function BlogPost({ params }: { params: { id: string } }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set())

  const handleCommentLike = (commentId: number) => {
    setLikedComments(prev => {
      const newSet = new Set(prev)
      if (newSet.has(commentId)) {
        newSet.delete(commentId)
      } else {
        newSet.add(commentId)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              BlogHub
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/write">Write</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {blogPost.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-6">{blogPost.title}</h1>
          
          {/* Author Info */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={blogPost.author.avatar || "/placeholder.svg"} />
                <AvatarFallback>{blogPost.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <Link href={`/author/${blogPost.author.username}`} className="font-semibold hover:underline">
                  {blogPost.author.name}
                </Link>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(blogPost.publishedAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <Clock className="w-4 h-4" />
                  <span>{blogPost.readTime}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <Image
            src={blogPost.image || "/placeholder.svg"}
            alt={blogPost.title}
            width={800}
            height={400}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
        </div>

        {/* Article Actions */}
        <div className="flex items-center justify-between py-6 border-y">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "text-red-500" : ""}
            >
              <Heart className="w-5 h-5 mr-2" />
              {blogPost.likes + (isLiked ? 1 : 0)}
            </Button>
            <Button variant="ghost" asChild>
              <Link href="#comments">
                <MessageCircle className="w-5 h-5 mr-2" />
                {blogPost.comments}
              </Link>
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={isBookmarked ? "text-blue-500" : ""}
            >
              <Bookmark className="w-5 h-5 mr-2" />
              {isBookmarked ? "Saved" : "Save"}
            </Button>
          </div>
          <Button variant="ghost">
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </Button>
        </div>

        {/* Author Bio */}
        <Card className="my-8">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={blogPost.author.avatar || "/placeholder.svg"} />
                <AvatarFallback>{blogPost.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  <Link href={`/author/${blogPost.author.username}`} className="hover:underline">
                    {blogPost.author.name}
                  </Link>
                </h3>
                <p className="text-muted-foreground mb-4">{blogPost.author.bio}</p>
                <Button
                  variant="outline"
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? "Following" : "Follow"}
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
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Link href={`/author/${comment.author.username}`} className="font-semibold hover:underline">
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
                            className={likedComments.has(comment.id) ? "text-red-500" : ""}
                          >
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            {comment.likes + (likedComments.has(comment.id) ? 1 : 0)}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Reply className="w-4 h-4 mr-1" />
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
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={reply.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Link href={`/author/${reply.author.username}`} className="font-semibold hover:underline text-sm">
                                {reply.author.name}
                              </Link>
                              <span className="text-xs text-muted-foreground">{reply.publishedAt}</span>
                            </div>
                            <p className="text-sm mb-2">{reply.content}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCommentLike(reply.id)}
                              className={likedComments.has(reply.id) ? "text-red-500" : ""}
                            >
                              <ThumbsUp className="w-3 h-3 mr-1" />
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
    </div>
  )
}
