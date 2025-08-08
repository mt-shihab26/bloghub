"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Bookmark, Search, TrendingUp, Clock, User } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

// Mock data for recommended blogs
const recommendedBlogs = [
  {
    id: 1,
    title: "The Future of Web Development: What's Coming in 2024",
    excerpt: "Exploring the latest trends and technologies that will shape web development in the coming year...",
    author: {
      name: "Sarah Chen",
      avatar: "/woman-developer.png",
      username: "sarahchen"
    },
    publishedAt: "2 hours ago",
    readTime: "5 min read",
    likes: 124,
    comments: 18,
    tags: ["Web Development", "Technology", "Future"],
    image: "/futuristic-web-development.png",
    featured: true
  },
  {
    id: 2,
    title: "Building Scalable React Applications: Best Practices",
    excerpt: "Learn how to structure your React applications for maximum scalability and maintainability...",
    author: {
      name: "Mike Johnson",
      avatar: "/man-programmer.png",
      username: "mikej"
    },
    publishedAt: "4 hours ago",
    readTime: "8 min read",
    likes: 89,
    comments: 12,
    tags: ["React", "JavaScript", "Best Practices"],
    image: "/react-code-architecture.png"
  },
  {
    id: 3,
    title: "The Art of Technical Writing: A Developer's Guide",
    excerpt: "Master the skills needed to write clear, engaging technical content that developers actually want to read...",
    author: {
      name: "Emily Rodriguez",
      avatar: "/woman-writer.png",
      username: "emilyrod"
    },
    publishedAt: "6 hours ago",
    readTime: "6 min read",
    likes: 156,
    comments: 24,
    tags: ["Writing", "Documentation", "Communication"],
    image: "/placeholder-uv20w.png"
  },
  {
    id: 4,
    title: "Understanding Database Design Patterns",
    excerpt: "Deep dive into common database design patterns and when to use them in your applications...",
    author: {
      name: "David Kim",
      avatar: "/man-database-engineer.png",
      username: "davidkim"
    },
    publishedAt: "1 day ago",
    readTime: "10 min read",
    likes: 203,
    comments: 31,
    tags: ["Database", "Design Patterns", "Backend"],
    image: "/database-schema.png"
  }
]

const trendingTopics = [
  "AI & Machine Learning",
  "Web Development",
  "React",
  "Next.js",
  "TypeScript",
  "Database Design",
  "DevOps",
  "Mobile Development"
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
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
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-primary">
                BlogHub
              </Link>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/write">Write</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Article */}
            {recommendedBlogs[0] && (
              <Card className="mb-8 overflow-hidden">
                <div className="relative">
                  <Image
                    src={recommendedBlogs[0].image || "/placeholder.svg"}
                    alt={recommendedBlogs[0].title}
                    width={800}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary">
                    Featured
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={recommendedBlogs[0].author.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{recommendedBlogs[0].author.name[0]}</AvatarFallback>
                    </Avatar>
                    <Link href={`/author/${recommendedBlogs[0].author.username}`} className="text-sm font-medium hover:underline">
                      {recommendedBlogs[0].author.name}
                    </Link>
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-muted-foreground text-sm">{recommendedBlogs[0].publishedAt}</span>
                  </div>
                  <CardTitle className="text-2xl mb-2">
                    <Link href={`/blog/${recommendedBlogs[0].id}`} className="hover:underline">
                      {recommendedBlogs[0].title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-base">
                    {recommendedBlogs[0].excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(recommendedBlogs[0].id)}
                        className={likedPosts.has(recommendedBlogs[0].id) ? "text-red-500" : ""}
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        {recommendedBlogs[0].likes}
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/blog/${recommendedBlogs[0].id}#comments`}>
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {recommendedBlogs[0].comments}
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleBookmark(recommendedBlogs[0].id)}
                        className={bookmarkedPosts.has(recommendedBlogs[0].id) ? "text-blue-500" : ""}
                      >
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{recommendedBlogs[0].readTime}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {recommendedBlogs[0].tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommended Articles */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center">
                <TrendingUp className="w-6 h-6 mr-2" />
                Recommended for You
              </h2>
              {recommendedBlogs.slice(1).map((blog) => (
                <Card key={blog.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <Image
                        src={blog.image || "/placeholder.svg"}
                        alt={blog.title}
                        width={300}
                        height={200}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <CardHeader>
                        <div className="flex items-center space-x-2 mb-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={blog.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <Link href={`/author/${blog.author.username}`} className="text-sm font-medium hover:underline">
                            {blog.author.name}
                          </Link>
                          <span className="text-muted-foreground text-sm">•</span>
                          <span className="text-muted-foreground text-sm">{blog.publishedAt}</span>
                        </div>
                        <CardTitle className="text-xl mb-2">
                          <Link href={`/blog/${blog.id}`} className="hover:underline">
                            {blog.title}
                          </Link>
                        </CardTitle>
                        <CardDescription>
                          {blog.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(blog.id)}
                              className={likedPosts.has(blog.id) ? "text-red-500" : ""}
                            >
                              <Heart className="w-4 h-4 mr-1" />
                              {blog.likes}
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/blog/${blog.id}#comments`}>
                                <MessageCircle className="w-4 h-4 mr-1" />
                                {blog.comments}
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleBookmark(blog.id)}
                              className={bookmarkedPosts.has(blog.id) ? "text-blue-500" : ""}
                            >
                              <Bookmark className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{blog.readTime}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {blog.tags.map((tag) => (
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
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trending Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {trendingTopics.map((topic) => (
                    <Button
                      key={topic}
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      asChild
                    >
                      <Link href={`/topic/${topic.toLowerCase().replace(/\s+/g, '-')}`}>
                        {topic}
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Authors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Authors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedBlogs.slice(0, 3).map((blog) => (
                    <div key={blog.author.username} className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={blog.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Link href={`/author/${blog.author.username}`} className="font-medium hover:underline">
                          {blog.author.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">@{blog.author.username}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { name: "Web Development", count: 45, color: "bg-blue-100 text-blue-800" },
                    { name: "Mobile Development", count: 23, color: "bg-green-100 text-green-800" },
                    { name: "Data Science", count: 18, color: "bg-purple-100 text-purple-800" },
                    { name: "DevOps", count: 15, color: "bg-orange-100 text-orange-800" },
                    { name: "Design", count: 12, color: "bg-pink-100 text-pink-800" },
                    { name: "Career", count: 8, color: "bg-yellow-100 text-yellow-800" }
                  ].map((category) => (
                    <Link
                      key={category.name}
                      href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <span className="text-sm font-medium">{category.name}</span>
                      <Badge className={`text-xs ${category.color}`}>
                        {category.count}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React", "JavaScript", "TypeScript", "Next.js", "Node.js",
                    "Python", "CSS", "HTML", "Database", "API", "Tutorial", "Best Practices"
                  ].map((tag) => (
                    <Link key={tag} href={`/tag/${tag.toLowerCase()}`}>
                      <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                        #{tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stay Updated</CardTitle>
                <CardDescription>
                  Get the latest articles delivered to your inbox
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Input placeholder="Enter your email" type="email" />
                  <Button className="w-full">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
