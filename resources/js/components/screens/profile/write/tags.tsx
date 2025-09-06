import { useState } from 'react';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, CheckCircle, Sparkles, Hash } from 'lucide-react';

export const Tags = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isManual, setIsManual] = useState(true);

    const addTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
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

    const generateTags = async () => {
        setIsGenerating(true);
        // Simulate AI tag generation based on content analysis
        setTimeout(() => {
            const suggestedTags = [
                ['react', 'typescript', 'frontend'],
                ['javascript', 'webdev', 'tutorial'],
                ['python', 'datascience', 'ai'],
                ['nodejs', 'backend', 'api'],
                ['css', 'design', 'ui'],
            ];
            const randomTagSet = suggestedTags[Math.floor(Math.random() * suggestedTags.length)];
            setTags(randomTagSet);
            setIsGenerating(false);
            setIsManual(false);
        }, 2000);
    };

    const handleManualAdd = () => {
        addTag();
        setIsManual(true);
    };

    const handleManualRemove = (tagToRemove: string) => {
        removeTag(tagToRemove);
        setIsManual(true);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Hash className="w-5 h-5" />
                    <Label htmlFor="tags" className="font-medium">Tags ({tags.length}/5)</Label>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={generateTags}
                    disabled={isGenerating}
                    className="flex items-center gap-2"
                >
                    <Sparkles className="w-4 h-4" />
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                </Button>
            </div>

            <div className="flex space-x-2">
                <Input
                    id="tags"
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={tags.length >= 5}
                />
                <Button onClick={handleManualAdd} size="sm" disabled={tags.length >= 5 || !newTag.trim()}>
                    Add
                </Button>
            </div>

            {tags.length > 0 && (
                <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                #{tag}
                                <X
                                    className="w-3 h-3 cursor-pointer hover:text-destructive"
                                    onClick={() => handleManualRemove(tag)}
                                />
                            </Badge>
                        ))}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span>Tags added</span>
                        </div>
                        {!isManual && tags.length > 0 && (
                            <div className="flex items-center space-x-1 text-blue-600">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-sm">AI Generated</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};