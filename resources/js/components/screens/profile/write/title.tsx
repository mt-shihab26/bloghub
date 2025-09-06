import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

export const Title = () => {
    const [title, setTitle] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isManual, setIsManual] = useState(true);

    const generateTitle = async () => {
        setIsGenerating(true);
        // Simulate AI generation
        setTimeout(() => {
            const titles = [
                "10 Essential Tips for Modern Web Development",
                "Building Scalable Applications with React and TypeScript",
                "The Future of AI in Software Development",
                "Mastering Database Design: Best Practices Guide",
                "How to Optimize Your Code for Better Performance"
            ];
            const randomTitle = titles[Math.floor(Math.random() * titles.length)];
            setTitle(randomTitle);
            setIsGenerating(false);
            setIsManual(false);
        }, 2000);
    };

    const handleManualEdit = () => {
        setIsManual(true);
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Create an engaging title for your article</p>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={generateTitle}
                    disabled={isGenerating}
                    className="flex items-center gap-2"
                >
                    <Sparkles className="w-4 h-4" />
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                </Button>
            </div>
            <Input
                id="title"
                placeholder="Enter your article title..."
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                    setIsManual(true);
                }}
                onFocus={handleManualEdit}
                className="text-lg font-medium"
            />
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                    {title.length > 10 ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : title.length > 0 ? (
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                    ) : null}
                    {title.length > 0 && (
                        <span className="text-muted-foreground">
                            {title.length > 10 ? 'Good title length' : 'Title should be more descriptive'}
                        </span>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    {!isManual && title && (
                        <div className="flex items-center space-x-1 text-blue-600">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm">AI Generated</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
