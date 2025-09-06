import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Sparkles, FolderOpen } from 'lucide-react';

export const Category = () => {
    const [category, setCategory] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isManual, setIsManual] = useState(true);

    const generateCategory = async () => {
        setIsGenerating(true);
        // Simulate AI category selection based on content analysis
        setTimeout(() => {
            const categories = [
                'web-development',
                'mobile-development', 
                'data-science',
                'tutorial',
                'devops'
            ];
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            setCategory(randomCategory);
            setIsGenerating(false);
            setIsManual(false);
        }, 2000);
    };

    const handleManualChange = (value: string) => {
        setCategory(value);
        setIsManual(true);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FolderOpen className="w-5 h-5" />
                    <Label htmlFor="category" className="font-medium">Category *</Label>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={generateCategory}
                    disabled={isGenerating}
                    className="flex items-center gap-2"
                >
                    <Sparkles className="w-4 h-4" />
                    {isGenerating ? 'Analyzing...' : 'Suggest with AI'}
                </Button>
            </div>

            <Select value={category} onValueChange={handleManualChange}>
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

            <div className="flex items-center justify-between text-sm">
                {category && (
                    <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Category selected</span>
                    </div>
                )}
                {!isManual && category && (
                    <div className="flex items-center space-x-1 text-blue-600">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm">AI Suggested</span>
                    </div>
                )}
            </div>
        </div>
    );
};