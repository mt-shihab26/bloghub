import type React from 'react';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
    Save,
    Send,
    ImageIcon,
    X,
    Bold,
    Italic,
    Code,
    List,
    Quote,
    Heading1,
    Heading2,
    Settings,
    Lightbulb,
    BookOpen,
    Target,
    Clock,
    FileText,
    Copy,
    Trash2,
    Upload,
    CheckCircle,
    AlertCircle,
} from 'lucide-react';

// Mock drafts data
const mockDrafts = [
    {
        id: 1,
        title: 'Getting Started with Next.js 15',
        wordCount: 1250,
        lastSaved: '2 hours ago',
    },
    {
        id: 2,
        title: 'Understanding React Server Components',
        wordCount: 890,
        lastSaved: '1 day ago',
    },
    {
        id: 3,
        title: 'Building Scalable APIs with Node.js',
        wordCount: 2100,
        lastSaved: '3 days ago',
    },
];

export default function ProfileWritePage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(`# Welcome to the Markdown Editor

Start writing your amazing blog post here! This editor supports full **Markdown** syntax.

## Features

- **Bold** and *italic* text
- Code blocks with \`inline code\`
- Lists and quotes
- And much more!

### Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

> Quotes look great too!

- Lists
- Are
- Supported`);
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState('');
    const [category, setCategory] = useState('');
    const [isDraft, setIsDraft] = useState(true);
    const [featuredImage, setFeaturedImage] = useState<string | null>(null);
    const [showMarkdownGuide, setShowMarkdownGuide] = useState(true);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [wordCount, setWordCount] = useState(0);
    const [readingTime, setReadingTime] = useState(0);
    const [completionPercentage, setCompletionPercentage] = useState(0);
    const [drafts] = useState(mockDrafts);

    // Calculate word count and reading time
    useEffect(() => {
        const words = content
            .trim()
            .split(/\s+/)
            .filter(word => word.length > 0).length;
        setWordCount(words);
        setReadingTime(Math.ceil(words / 200)); // Average reading speed: 200 words per minute
    }, [content]);

    // Calculate completion percentage
    useEffect(() => {
        let completed = 0;
        const total = 5;

        if (title.trim().length > 0) completed++;
        if (content.trim().length > 100) completed++;
        if (category) completed++;
        if (tags.length > 0) completed++;
        if (featuredImage) completed++;

        setCompletionPercentage((completed / total) * 100);
    }, [title, content, category, tags, featuredImage]);

    // Auto-save functionality
    useEffect(() => {
        const autoSave = setInterval(() => {
            if (title || content) {
                setLastSaved(new Date());
                // Here you would typically save to your backend
                console.log('Auto-saved draft');
            }
        }, 30000); // Auto-save every 30 seconds

        return () => clearInterval(autoSave);
    }, [title, content]);

    const addTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    const insertMarkdown = (before: string, after = '') => {
        const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        const newText =
            content.substring(0, start) + before + selectedText + after + content.substring(end);

        setContent(newText);

        // Set cursor position after insertion
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
                start + before.length,
                start + before.length + selectedText.length,
            );
        }, 0);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real app, you'd upload to your server/cloud storage
            const imageUrl = URL.createObjectURL(file);
            setFeaturedImage(imageUrl);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const imageUrl = URL.createObjectURL(file);
                setFeaturedImage(imageUrl);
            }
        }
    };

    const formatLastSaved = (date: Date | null) => {
        if (!date) return 'Never';
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes} min ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        const days = Math.floor(hours / 24);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="text-2xl font-bold text-primary">BlogHub</div>
                            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                                <FileText className="w-4 h-4" />
                                <span>{wordCount} words</span>
                                <span>•</span>
                                <Clock className="w-4 h-4" />
                                <span>{readingTime} min read</span>
                                <span>•</span>
                                <span>Last saved: {formatLastSaved(lastSaved)}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center space-x-2">
                                <span className="text-sm text-muted-foreground">Progress:</span>
                                <Progress value={completionPercentage} className="w-20" />
                                <span className="text-sm font-medium">
                                    {Math.round(completionPercentage)}%
                                </span>
                            </div>
                            <Button variant="ghost" onClick={() => setLastSaved(new Date())}>
                                <Save className="w-4 h-4 mr-2" />
                                Save Draft
                            </Button>
                            <Button variant="outline">
                                <X className="w-4 h-4 mr-2" />
                                Preview
                            </Button>
                            <Button
                                onClick={() => setIsDraft(false)}
                                disabled={completionPercentage < 80}
                            >
                                <Send className="w-4 h-4 mr-2" />
                                {isDraft ? 'Publish' : 'Update'}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Progress Bar */}
                    <div className="md:hidden mt-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                            <span>Post completion</span>
                            <span>{Math.round(completionPercentage)}%</span>
                        </div>
                        <Progress value={completionPercentage} className="w-full" />
                    </div>
                </div>
            </header>
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Editor */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title and Featured Image */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Create Your Story</CardTitle>
                                <CardDescription>
                                    Share your knowledge and insights with the community
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        placeholder="Enter your article title..."
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        className="text-lg font-medium"
                                    />
                                    {title.length > 0 && (
                                        <div className="flex items-center space-x-2 text-sm">
                                            {title.length > 10 ? (
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <AlertCircle className="w-4 h-4 text-orange-500" />
                                            )}
                                            <span className="text-muted-foreground">
                                                {title.length > 10
                                                    ? 'Good title length'
                                                    : 'Title should be more descriptive'}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Featured Image */}
                                <div className="space-y-2">
                                    <Label>Featured Image</Label>
                                    {featuredImage ? (
                                        <div className="relative">
                                            <img
                                                src={featuredImage || '/placeholder.svg'}
                                                alt="Featured image"
                                                width={800}
                                                height={400}
                                                className="w-full h-64 object-cover rounded-lg"
                                            />
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="absolute top-2 right-2"
                                                onClick={() => setFeaturedImage(null)}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div
                                            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                                            onDragOver={handleDragOver}
                                            onDrop={handleDrop}
                                            onClick={() =>
                                                document.getElementById('image-upload')?.click()
                                            }
                                        >
                                            <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                            <p className="text-muted-foreground mb-4">
                                                Drag and drop an image, or click to browse
                                            </p>
                                            <Button variant="outline">
                                                <Upload className="w-4 h-4 mr-2" />
                                                Choose Image
                                            </Button>
                                            <input
                                                id="image-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageUpload}
                                            />
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Content Editor */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Content *</CardTitle>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setShowMarkdownGuide(!showMarkdownGuide)}
                                        >
                                            <BookOpen className="w-4 h-4 mr-2" />
                                            {showMarkdownGuide ? 'Hide' : 'Show'} Guide
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* Markdown Toolbar */}
                                <div className="flex flex-wrap gap-2 mb-4 p-2 border rounded-lg bg-muted/30">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => insertMarkdown('**', '**')}
                                        title="Bold"
                                    >
                                        <Bold className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => insertMarkdown('*', '*')}
                                        title="Italic"
                                    >
                                        <Italic className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => insertMarkdown('`', '`')}
                                        title="Inline Code"
                                    >
                                        <Code className="w-4 h-4" />
                                    </Button>
                                    <Separator orientation="vertical" className="h-6" />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => insertMarkdown('# ', '')}
                                        title="Heading 1"
                                    >
                                        <Heading1 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => insertMarkdown('## ', '')}
                                        title="Heading 2"
                                    >
                                        <Heading2 className="w-4 h-4" />
                                    </Button>
                                    <Separator orientation="vertical" className="h-6" />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => insertMarkdown('[', '](url)')}
                                        title="Link"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => insertMarkdown('- ', '')}
                                        title="List"
                                    >
                                        <List className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => insertMarkdown('> ', '')}
                                        title="Quote"
                                    >
                                        <Quote className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Editor Tabs */}
                                <Tabs defaultValue="write" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="write">Write</TabsTrigger>
                                        <TabsTrigger value="preview">Preview</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="write" className="space-y-2">
                                        <Textarea
                                            id="content-editor"
                                            placeholder="Tell your story... (Markdown supported)"
                                            value={content}
                                            onChange={e => setContent(e.target.value)}
                                            className="min-h-[500px] font-mono text-sm resize-none"
                                        />
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <div className="flex items-center space-x-4">
                                                <span>{wordCount} words</span>
                                                <span>{readingTime} min read</span>
                                            </div>
                                            {content.length > 100 ? (
                                                <div className="flex items-center space-x-1 text-green-600">
                                                    <CheckCircle className="w-4 h-4" />
                                                    <span>Good content length</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center space-x-1 text-orange-500">
                                                    <AlertCircle className="w-4 h-4" />
                                                    <span>Content too short</span>
                                                </div>
                                            )}
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="preview" className="space-y-2">
                                        <div className="border rounded-lg p-4 min-h-[500px] prose max-w-none">
                                            {content ? (
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: content
                                                            .replace(/\n/g, '<br>')
                                                            .replace(
                                                                /\*\*(.*?)\*\*/g,
                                                                '<strong>$1</strong>',
                                                            )
                                                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                                            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                                                            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                                                            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                                                            .replace(
                                                                /^> (.*$)/gm,
                                                                '<blockquote>$1</blockquote>',
                                                            )
                                                            .replace(/^- (.*$)/gm, '<li>$1</li>')
                                                            .replace(
                                                                /`([^`]+)`/g,
                                                                '<code>$1</code>',
                                                            ),
                                                    }}
                                                />
                                            ) : (
                                                <p className="text-muted-foreground">
                                                    Start writing to see a preview...
                                                </p>
                                            )}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Publishing Options */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Settings className="w-5 h-5 mr-2" />
                                    Publishing
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category *</Label>
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="web-development">
                                                Web Development
                                            </SelectItem>
                                            <SelectItem value="mobile-development">
                                                Mobile Development
                                            </SelectItem>
                                            <SelectItem value="data-science">
                                                Data Science
                                            </SelectItem>
                                            <SelectItem value="devops">DevOps</SelectItem>
                                            <SelectItem value="design">Design</SelectItem>
                                            <SelectItem value="career">Career</SelectItem>
                                            <SelectItem value="tutorial">Tutorial</SelectItem>
                                            <SelectItem value="opinion">Opinion</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {category && (
                                        <div className="flex items-center space-x-2 text-sm text-green-600">
                                            <CheckCircle className="w-4 h-4" />
                                            <span>Category selected</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tags">Tags ({tags.length}/5)</Label>
                                    <div className="flex space-x-2">
                                        <Input
                                            id="tags"
                                            placeholder="Add a tag..."
                                            value={newTag}
                                            onChange={e => setNewTag(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            disabled={tags.length >= 5}
                                        />
                                        <Button
                                            onClick={addTag}
                                            size="sm"
                                            disabled={tags.length >= 5 || !newTag.trim()}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                    {tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {tags.map(tag => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                    className="flex items-center gap-1"
                                                >
                                                    #{tag}
                                                    <X
                                                        className="w-3 h-3 cursor-pointer hover:text-destructive"
                                                        onClick={() => removeTag(tag)}
                                                    />
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                    {tags.length > 0 && (
                                        <div className="flex items-center space-x-2 text-sm text-green-600">
                                            <CheckCircle className="w-4 h-4" />
                                            <span>Tags added</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="draft-mode"
                                        checked={isDraft}
                                        onCheckedChange={setIsDraft}
                                    />
                                    <Label htmlFor="draft-mode">Save as draft</Label>
                                </div>

                                <div className="pt-4 border-t">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Status:</span>
                                        <Badge variant={isDraft ? 'secondary' : 'default'}>
                                            {isDraft ? 'Draft' : 'Ready to Publish'}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-sm mt-2">
                                        <span>Completion:</span>
                                        <span
                                            className={
                                                completionPercentage >= 80
                                                    ? 'text-green-600'
                                                    : 'text-orange-500'
                                            }
                                        >
                                            {Math.round(completionPercentage)}%
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Writing Tips */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Lightbulb className="w-5 h-5 mr-2" />
                                    Writing Tips
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="flex items-start space-x-2">
                                    <Target className="w-4 h-4 mt-0.5 text-blue-500" />
                                    <div>
                                        <h4 className="font-medium mb-1">Hook your readers</h4>
                                        <p className="text-muted-foreground">
                                            Start with a compelling introduction that grabs
                                            attention
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Target className="w-4 h-4 mt-0.5 text-green-500" />
                                    <div>
                                        <h4 className="font-medium mb-1">Use clear headings</h4>
                                        <p className="text-muted-foreground">
                                            Structure your content with descriptive headings
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Target className="w-4 h-4 mt-0.5 text-purple-500" />
                                    <div>
                                        <h4 className="font-medium mb-1">Add code examples</h4>
                                        <p className="text-muted-foreground">
                                            Include practical examples to illustrate your points
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Target className="w-4 h-4 mt-0.5 text-orange-500" />
                                    <div>
                                        <h4 className="font-medium mb-1">Engage with readers</h4>
                                        <p className="text-muted-foreground">
                                            Ask questions and encourage discussion
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Markdown Guide */}
                        {showMarkdownGuide && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span className="flex items-center">
                                            <BookOpen className="w-5 h-5 mr-2" />
                                            Markdown Guide
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setShowMarkdownGuide(false)}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm font-mono">
                                    <div className="space-y-1">
                                        <div className="font-semibold">Headers:</div>
                                        <div># H1 Header</div>
                                        <div>## H2 Header</div>
                                        <div>### H3 Header</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="font-semibold">Text Formatting:</div>
                                        <div>**Bold text**</div>
                                        <div>*Italic text*</div>
                                        <div>`Inline code`</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="font-semibold">Lists:</div>
                                        <div>- Bullet point</div>
                                        <div>1. Numbered list</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="font-semibold">Links & Images:</div>
                                        <div>[Link text](URL)</div>
                                        <div>![Alt text](image-url)</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="font-semibold">Code Blocks:</div>
                                        <div>\`\`\`javascript</div>
                                        <div>console.log('Hello');</div>
                                        <div>\`\`\`</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="font-semibold">Quotes:</div>
                                        <div>&gt; This is a quote</div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Recent Drafts */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Drafts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {drafts.map(draft => (
                                        <div
                                            key={draft.id}
                                            className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                                        >
                                            <div className="flex-1">
                                                <h4 className="font-medium text-sm mb-1 line-clamp-1">
                                                    {draft.title}
                                                </h4>
                                                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                                    <span>{draft.wordCount} words</span>
                                                    <span>•</span>
                                                    <span>{draft.lastSaved}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Button variant="ghost" size="sm" title="Duplicate">
                                                    <Copy className="w-3 h-3" />
                                                </Button>
                                                <Button variant="ghost" size="sm" title="Delete">
                                                    <Trash2 className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
