"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, Bookmark, MapPin, Calendar, LinkIcon, Users, FileText, Clock } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

// Mock author data
const authorData = {
  name: "Sarah Chen",
  username: "sarahchen",
  avatar: "/woman-developer.png",
  bio: "Full-stack developer passionate about creating beautiful, functional web applications. I love sharing knowledge about React, Next.js, and modern web development practices.",
  location: "San Francisco, CA",
  joinedDate: "March 2022",
  website: "https://sarahchen.dev",
  followers: 1234,
  following: 567,
  totalPosts: 42,
  totalLikes: 5678
}

const authorPosts = [
  {
    id: 1,
    title: "The Future of Web Development: What's Coming in 2024",
    excerpt: "Exploring the latest trends and technologies that will shape web development in the coming year...",
    publishedAt: "2 hours ago",
    readTime: "5 min read",
    likes: 124,
    comments: 18,
    tags: ["Web Development", "Technology", "Future"],
    image: "/futuristic-web-development.png"
  },
  {
    id: 5,
    title: "Building Responsive Layouts with CSS Grid",
    excerpt: "Master CSS Grid to create complex, responsive layouts with ease...",
    publishedAt: "3 days ago",
    readTime: "7 min read",
    likes: 89,
    comments: 12,
    tags: ["CSS", "Grid", "Responsive Design"],
    image: "/css-grid-layout.png"
  },
  {
    id: 6,
    title: "State Management in React: A Complete Guide",
    excerpt: "Everything you need to know about managing state in React applications...",
    publishedAt: "1 week ago",
    readTime: "12 min read",
    likes: 203,
    comments: 31,
    tags: ["React", "State Management", "JavaScript"],
    image: "/react-state-management.png"
  }
]

export default function AuthorProfile({ params }: { params: { username: string } }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(new Set())

  const handleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const handleBookmark = (postId: number) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
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

      <div className="container mx-auto px-4 py-8">
        {/* Author Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={authorData.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">{authorData.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{authorData.name}</h1>
                  <p className="text-muted-foreground mb-4">@{authorData.username}</p>
                  <p className="text-lg mb-4">{authorData.bio}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {authorData.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Joined {authorData.joinedDate}
                    </div>
                    <div className="flex items-center">
                      <LinkIcon className="w-4 h-4 mr-1" />
                      <a href={authorData.website} className="hover:underline" target="_blank" rel="noopener noreferrer">
                        sarahchen.dev
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="font-semibold">{authorData.followers.toLocaleString()}</span>
                      <span className="text-muted-foreground ml-1">followers</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold">{authorData.following.toLocaleString()}</span>
                      <span className="text-muted-foreground ml-1">following</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      <span className="font-semibold">{authorData.totalPosts}</span>
                      <span className="text-muted-foreground ml-1">posts</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      <span className="font-semibold">{authorData.totalLikes.toLocaleString()}</span>
                      <span className="text-muted-foreground ml-1">likes</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setIsFollowing(!isFollowing)}
                    variant={isFollowing ? "outline" : "default"}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline">Message</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="space-y-6 mt-6">
            {authorPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={300}
                      height={200}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <div className="flex items-center space-x-2 mb-2 text-sm text-muted-foreground">
                        <span>{post.publishedAt}</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-2">
                        <Link href={`/blog/${post.id}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription>
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={likedPosts.has(post.id) ? "text-red-500" : ""}
                          >
                            <Heart className="w-4 h-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/blog/${post.id}#comments`}>
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {post.comments}
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleBookmark(post.id)}
                            className={bookmarkedPosts.has(post.id) ? "text-blue-500" : ""}
                          >
                            <Bookmark className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="about" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>About {authorData.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{authorData.bio}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge>React</Badge>
                      <Badge>Next.js</Badge>
                      <Badge>TypeScript</Badge>
                      <Badge>Node.js</Badge>
                      <Badge>CSS</Badge>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Web Development</Badge>
                      <Badge variant="outline">UI/UX Design</Badge>
                      <Badge variant="outline">Open Source</Badge>
                      <Badge variant="outline">Teaching</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Published "The Future of Web Development: What's Coming in 2024"</span>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Liked "Understanding Database Design Patterns" by David Kim</span>
                    <span className="text-xs text-muted-foreground">1 day ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Started following Mike Johnson</span>
                    <span className="text-xs text-muted-foreground">2 days ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Published "Building Responsive Layouts with CSS Grid"</span>
                    <span className="text-xs text-muted-foreground">3 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
