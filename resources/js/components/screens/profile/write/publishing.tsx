import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Settings, Link } from 'lucide-react';

export const Publishing = () => {
    const [slug, setSlug] = useState('');
    const [isDraft, setIsDraft] = useState(true);

    const formatSlug = (value: string) => {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedSlug = formatSlug(e.target.value);
        setSlug(formattedSlug);
    };

    return (
        <div className="space-y-6">
            {/* Article Slug */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Link className="w-4 h-4" />
                    <Label htmlFor="slug" className="font-medium">
                        Article Slug
                    </Label>
                </div>
                <Input
                    id="slug"
                    placeholder="my-awesome-article"
                    value={slug}
                    onChange={handleSlugChange}
                />
                <p className="text-xs text-muted-foreground">
                    URL-friendly version of your title. Only lowercase letters, numbers, and hyphens
                    allowed.
                </p>
                {slug && (
                    <div className="flex items-center space-x-2 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Slug: /blog/{slug}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
