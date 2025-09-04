import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Link } from '@inertiajs/react';
import { Eye, ImageIcon, Save, Send, X } from 'lucide-react';
import { useState } from 'react';

export default function WritePage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState('');
    const [category, setCategory] = useState('');
    const [isDraft, setIsDraft] = useState(true);

    const addTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-2xl font-bold text-primary">
                            BlogHub
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" onClick={() => setIsDraft(true)}>
                                <Save className="mr-2 h-4 w-4" />
                                Save Draft
                            </Button>
                            <Button variant="outline">
                                <Eye className="mr-2 h-4 w-4" />
                                Preview
                            </Button>
                            <Button onClick={() => setIsDraft(false)}>
                                <Send className="mr-2 h-4 w-4" />
                                Publish
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto max-w-4xl px-4 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Editor */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Write Your Story</CardTitle>
                                <CardDescription>Share your knowledge and insights with the community</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="Enter your article title..."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="text-lg"
                                    />
                                </div>

                                {/* Featured Image */}
                                <div className="space-y-2">
                                    <Label>Featured Image</Label>
                                    <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
                                        <ImageIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                                        <p className="mb-4 text-muted-foreground">
                                            Drag and drop an image, or click to browse
                                        </p>
                                        <Button variant="outline">Choose Image</Button>
                                    </div>
                                </div>

                                {/* Content Editor */}
                                <Tabs defaultValue="write" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="write">Write</TabsTrigger>
                                        <TabsTrigger value="preview">Preview</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="write" className="space-y-2">
                                        <Label htmlFor="content">Content</Label>
                                        <Textarea
                                            id="content"
                                            placeholder="Tell your story... (Markdown supported)"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            className="min-h-[400px] font-mono"
                                        />
                                    </TabsContent>
                                    <TabsContent value="preview" className="space-y-2">
                                        <Label>Preview</Label>
                                        <div className="prose min-h-[400px] max-w-none rounded-lg border p-4">
                                            {content ? (
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: content.replace(/\n/g, '<br>'),
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
                                <CardTitle>Publishing</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="web-development">Web Development</SelectItem>
                                            <SelectItem value="mobile-development">Mobile Development</SelectItem>
                                            <SelectItem value="data-science">Data Science</SelectItem>
                                            <SelectItem value="devops">DevOps</SelectItem>
                                            <SelectItem value="design">Design</SelectItem>
                                            <SelectItem value="career">Career</SelectItem>
                                            <SelectItem value="tutorial">Tutorial</SelectItem>
                                            <SelectItem value="opinion">Opinion</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tags">Tags</Label>
                                    <div className="flex space-x-2">
                                        <Input
                                            id="tags"
                                            placeholder="Add a tag..."
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                        />
                                        <Button onClick={addTag} size="sm">
                                            Add
                                        </Button>
                                    </div>
                                    {tags.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {tags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                    className="flex items-center gap-1"
                                                >
                                                    {tag}
                                                    <X
                                                        className="h-3 w-3 cursor-pointer"
                                                        onClick={() => removeTag(tag)}
                                                    />
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Status:</span>
                                        <Badge variant={isDraft ? 'secondary' : 'default'}>
                                            {isDraft ? 'Draft' : 'Published'}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Writing Tips */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Writing Tips</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div>
                                    <h4 className="mb-1 font-medium">Use a compelling title</h4>
                                    <p className="text-muted-foreground">
                                        Make it clear and engaging to attract readers
                                    </p>
                                </div>
                                <div>
                                    <h4 className="mb-1 font-medium">Add relevant tags</h4>
                                    <p className="text-muted-foreground">Help readers discover your content</p>
                                </div>
                                <div>
                                    <h4 className="mb-1 font-medium">Include code examples</h4>
                                    <p className="text-muted-foreground">
                                        Use markdown code blocks for better readability
                                    </p>
                                </div>
                                <div>
                                    <h4 className="mb-1 font-medium">Engage with comments</h4>
                                    <p className="text-muted-foreground">Respond to readers to build community</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Markdown Guide */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Markdown Guide</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 font-mono text-sm">
                                <div># Heading 1</div>
                                <div>## Heading 2</div>
                                <div>**Bold text**</div>
                                <div>*Italic text*</div>
                                <div>`Inline code`</div>
                                <div>
                                    ```
                                    <br />
                                    Code block
                                    <br />
                                    ```
                                </div>
                                <div>[Link](url)</div>
                                <div>![Image](url)</div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
