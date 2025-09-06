import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Save, Send, X } from 'lucide-react';
import { Options } from './options';

export const Header = () => {
    const [isDraft, setIsDraft] = useState(true);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

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
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95 sticky top-0 z-50">
            <div className="h-[4.45rem] flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Options />
                    <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>Last saved: {formatLastSaved(lastSaved)}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" onClick={() => setLastSaved(new Date())}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Draft
                    </Button>
                    <Button variant="outline">
                        <X className="w-4 h-4 mr-2" />
                        Preview
                    </Button>
                    <Button onClick={() => setIsDraft(false)}>
                        <Send className="w-4 h-4 mr-2" />
                        {isDraft ? 'Publish' : 'Update'}
                    </Button>
                </div>
            </div>
        </div>
    );
};
