import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
    X,
    Bold,
    Italic,
    Code,
    List,
    Quote,
    Heading1,
    Heading2,
    CheckCircle,
    AlertCircle,
} from 'lucide-react';

export const Writing = () => {
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
    const [wordCount] = useState(0);
    const [readingTime] = useState(0);

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

    return (
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
                <div>
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
                                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                                .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                                                .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                                                .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                                                .replace(
                                                    /^> (.*$)/gm,
                                                    '<blockquote>$1</blockquote>',
                                                )
                                                .replace(/^- (.*$)/gm, '<li>$1</li>')
                                                .replace(/`([^`]+)`/g, '<code>$1</code>'),
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
                </div>
            </CardContent>
        </Card>
    );
};
