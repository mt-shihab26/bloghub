import { AlertCircle, Bold, CheckCircle, Code, Heading1, Heading2, Italic, List, Quote, X } from 'lucide-react';

import { useWriteStore } from '@/states/use-write-store';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

export const Content = () => {
    const { post, setPostKey } = useWriteStore();
    const { content } = post;

    const insertMarkdown = (before: string, after = '') => {
        const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);

        setPostKey('content', newText);

        // Set cursor position after insertion
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
        }, 0);
    };

    return (
        <div>
            {/* Markdown Toolbar */}
            <div className="mb-4 flex flex-wrap gap-2 rounded-lg border bg-muted/30 p-2">
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown('**', '**')} title="Bold">
                    <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown('*', '*')} title="Italic">
                    <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown('`', '`')} title="Inline Code">
                    <Code className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown('# ', '')} title="Heading 1">
                    <Heading1 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown('## ', '')} title="Heading 2">
                    <Heading2 className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown('[', '](url)')} title="Link">
                    <X className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown('- ', '')} title="List">
                    <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => insertMarkdown('> ', '')} title="Quote">
                    <Quote className="h-4 w-4" />
                </Button>
            </div>

            {/* Side by Side Editor and Preview */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Editor */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Write</h3>
                    </div>
                    <Textarea
                        id="content-editor"
                        placeholder="Tell your story... Supports: GitHub Flavored Markdown • LaTeX Math Equations • Mermaid Diagrams • Code Syntax Highlighting"
                        value={content}
                        onChange={(e) => setPostKey('content', e.target.value)}
                        className="min-h-[500px] resize-none font-mono text-sm"
                    />
                    {content.length > 100 ? (
                        <div className="flex items-center space-x-1 text-sm text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span>Good content length</span>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-1 text-sm text-orange-500">
                            <AlertCircle className="h-4 w-4" />
                            <span>Content too short</span>
                        </div>
                    )}
                </div>

                {/* Preview */}
                <div className="space-y-2">
                    <h3 className="text-sm font-medium">Preview</h3>
                    <div className="prose min-h-[500px] max-w-none overflow-auto rounded-lg border p-4">
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
                                        .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
                                        .replace(/^- (.*$)/gm, '<li>$1</li>')
                                        .replace(/`([^`]+)`/g, '<code>$1</code>'),
                                }}
                            />
                        ) : (
                            <p className="text-muted-foreground">Start writing to see a preview...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
