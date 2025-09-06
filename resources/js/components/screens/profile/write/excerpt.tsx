import { useState } from 'react';
import { useProfileWriteStore } from '@/states/use-profile-write-store';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

export const Excerpt = () => {
    const { post, setPostKey } = useProfileWriteStore();

    const [isGenerating, setIsGenerating] = useState(false);
    const [isManual, setIsManual] = useState(true);

    const generateExcerpt = async () => {
        setIsGenerating(true);
        // Simulate AI generation
        setTimeout(() => {
            const generatedExcerpt = `This is an **AI-generated** excerpt that provides a compelling *preview* of your article content.

It automatically creates a summary that engages readers and encourages them to read the full post.`;
            setPostKey('excerpt', generatedExcerpt);
            setIsGenerating(false);
            setIsManual(false);
        }, 2000);
    };

    const handleManualEdit = () => {
        setIsManual(true);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                    Create a compelling preview of your article
                </p>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={generateExcerpt}
                    disabled={isGenerating}
                    className="flex items-center gap-2"
                >
                    <Sparkles className="w-4 h-4" />
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                </Button>
            </div>

            <Tabs defaultValue="write" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="write">Write</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="write" className="space-y-2">
                    <Textarea
                        placeholder="Write your article excerpt... (Markdown supported)"
                        value={post.excerpt}
                        onChange={e => {
                            setPostKey('excerpt', e.target.value);
                            setIsManual(true);
                        }}
                        className="min-h-[120px] font-mono text-sm resize-none"
                        onFocus={handleManualEdit}
                    />
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4 text-muted-foreground">
                            <span>{post.excerpt.length} characters</span>
                            <span>Recommended: 150-160 characters</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            {!isManual && post.excerpt && (
                                <div className="flex items-center space-x-1 text-blue-600">
                                    <Sparkles className="w-4 h-4" />
                                    <span className="text-sm">AI Generated</span>
                                </div>
                            )}
                            {post.excerpt.length >= 150 && post.excerpt.length <= 160 ? (
                                <div className="flex items-center space-x-1 text-green-600">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Good length</span>
                                </div>
                            ) : post.excerpt.length > 160 ? (
                                <div className="flex items-center space-x-1 text-orange-500">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>Too long</span>
                                </div>
                            ) : post.excerpt.length > 0 ? (
                                <div className="flex items-center space-x-1 text-orange-500">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>Too short</span>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="preview" className="space-y-2">
                    <div className="border rounded-lg p-4 min-h-[120px] prose max-w-none">
                        {post.excerpt ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.excerpt
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
                            <p className="text-muted-foreground">
                                Write an excerpt to see a preview...
                            </p>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};
