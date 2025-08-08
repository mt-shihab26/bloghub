"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Hash, TrendingUp, Users, FileText, Star } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"

const tags = [
  {
    name: "React",
    slug: "react",
    description: "A JavaScript library for building user interfaces",
    color: "bg-blue-500",
    totalPosts: 234,
    followers: 3456,
    weeklyGrowth: "+18",
    trending: true,
    category: "Web Development"
  },
  {
    name: "JavaScript",
    slug: "javascript",
    description: "The programming language of the web",
    color: "bg-yellow-500",
    totalPosts: 345,
    followers: 4567,
    weeklyGrowth: "+22",
    trending: true,
    category: "Web Development"
  },
  {
    name: "TypeScript",
    slug: "typescript",
    description: "Typed superset of JavaScript",
    color: "bg-blue-600",
    totalPosts: 156,
    followers: 2341,
    weeklyGrowth: "+12",
    trending: true,
    category: "Web Development"
  },
  {
    name: "Next.js",
    slug: "nextjs",
    description: "React framework for production",
    color: "bg-black",
    totalPosts: 123,
    followers: 1987,
    weeklyGrowth: "+15",
    trending: true,
    category: "Web Development"
  },
  {
    name: "Node.js",
    slug: "nodejs",
    description: "JavaScript runtime for server-side development",
    color: "bg-green-600",
    totalPosts: 189,
    followers: 2876,
    weeklyGrowth: "+9",
    trending: false,
    category: "Backend Development"
  },
  {
    name: "Python",
    slug: "python",
    description: "High-level programming language",
    color: "bg-blue-700",
    totalPosts: 267,
    followers: 3789,
    weeklyGrowth: "+14",
    trending: false,
    category: "Data Science"
  },
  {
    name: "CSS",
    slug: "css",
    description: "Styling language for web pages",
    color: "bg-blue-400",
    totalPosts: 198,
    followers: 2654,
    weeklyGrowth: "+7",
    trending: false,
    category: "Web Development"
  },
  {
    name: "Machine Learning",
    slug: "machine-learning",
    description: "AI and predictive modeling",
    color: "bg-purple-600",
    totalPosts: 145,
    followers: 2123,
    weeklyGrowth: "+11",
    trending: false,
    category: "Data Science"
  },
  {
    name: "Docker",
    slug: "docker",
    description: "Containerization platform",
    color: "bg-blue-500",
    totalPosts: 89,
    followers: 1456,
    weeklyGrowth: "+6",
    trending: false,
    category: "DevOps"
  },
  {
    name: "AWS",
    slug: "aws",
    description: "Amazon Web Services cloud platform",
    color: "bg-orange-500",
    totalPosts: 134,
    followers: 1876,
    weeklyGrowth: "+8",
    trending: false,
    category: "DevOps"
  },
  {
    name: "Vue.js",
    slug: "vuejs",
    description: "Progressive JavaScript framework",
    color: "bg-green-500",
    totalPosts: 98,
    followers: 1234,
    weeklyGrowth: "+5",
    trending: false,
    category: "Web Development"
  },
  {
    name: "GraphQL",
    slug: "graphql",
    description: "Query language for APIs",
    color: "bg-pink-500",
    totalPosts: 76,
    followers: 987,
    weeklyGrowth: "+4",
    trending: false,
    category: "Backend Development"
  }
]

export default function TagsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [followedTags, setFollowedTags] = useState<Set<string>>(new Set())

  const handleFollow = (slug: string) => {
    setFollowedTags(prev => {
      const newSet = new Set(prev)
      if (newSet.has(slug)) {
        newSet.delete(slug)
      } else {
        newSet.add(slug)
      }
      return newSet
    })
  }

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tag.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tag.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const trendingTags = tags.filter(tag => tag.trending)
  const popularTags = tags.sort((a, b) => b.followers - a.followers).slice(0, 6)

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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Explore Tags</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Follow tags to customize your feed and discover content that matches your interests
          </p>
          
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Trending Tags */}
        {!searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2" />
              Trending This Week
            </h2>
            <div className="flex flex-wrap gap-3">
              {trendingTags.map((tag) => (
                <Link key={tag.slug} href={`/tag/${tag.slug}`}>
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-red-200">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg ${tag.color} flex items-center justify-center`}>
                          <Hash className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">#{tag.name}</h3>
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              Trending
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                            <span>{tag.totalPosts} posts</span>
                            <span className="text-green-600 font-medium">{tag.weeklyGrowth}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Popular Tags */}
        {!searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Star className="w-6 h-6 mr-2" />
              Most Popular
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularTags.map((tag) => (
                <Card key={tag.slug} className="hover:shadow-lg transition-all duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-lg ${tag.color} flex items-center justify-center`}>
                          <Hash className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            <Link href={`/tag/${tag.slug}`} className="hover:underline">
                              #{tag.name}
                            </Link>
                          </CardTitle>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {tag.category}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant={followedTags.has(tag.slug) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleFollow(tag.slug)}
                      >
                        {followedTags.has(tag.slug) ? "Following" : "Follow"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-3">
                      {tag.description}
                    </CardDescription>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          {tag.totalPosts} posts
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {tag.followers} followers
                        </span>
                      </div>
                      <span className="text-green-600 font-medium">{tag.weeklyGrowth} this week</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Tags */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {searchQuery ? `Search Results (${filteredTags.length})` : 'All Tags'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTags.map((tag) => (
              <Card key={tag.slug} className="hover:shadow-lg transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${tag.color} flex items-center justify-center`}>
                        <Hash className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          <Link href={`/tag/${tag.slug}`} className="hover:underline">
                            #{tag.name}
                          </Link>
                        </h3>
                        {tag.trending && (
                          <Badge className="bg-red-100 text-red-800 text-xs mt-1">
                            Trending
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{tag.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{tag.totalPosts} posts</span>
                    <span>{tag.followers} followers</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {tag.category}
                    </Badge>
                    <Button
                      variant={followedTags.has(tag.slug) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleFollow(tag.slug)}
                    >
                      {followedTags.has(tag.slug) ? "Following" : "Follow"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* No Results */}
        {searchQuery && filteredTags.length === 0 && (
          <div className="text-center py-12">
            <Hash className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No tags found</h3>
            <p className="text-muted-foreground">
              Try searching with different keywords or browse all tags above.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
