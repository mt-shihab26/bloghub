import type React from 'react';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { X, Settings, CheckCircle } from 'lucide-react';

export const PublishingOptions = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState('');
    const [category, setCategory] = useState('');
    const [isDraft, setIsDraft] = useState(true);
    const [completionPercentage] = useState(0);

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

    return (
        <div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
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
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={tags.length >= 5}
                        />
                        <Button onClick={addTag} size="sm" disabled={tags.length >= 5 || !newTag.trim()}>
                            Add
                        </Button>
                    </div>
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
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
                    <Switch id="draft-mode" checked={isDraft} onCheckedChange={setIsDraft} />
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
                        <span className={completionPercentage >= 80 ? 'text-green-600' : 'text-orange-500'}>
                            {Math.round(completionPercentage)}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
