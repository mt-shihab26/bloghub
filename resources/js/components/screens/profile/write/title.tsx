import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { CheckCircle, AlertCircle } from 'lucide-react';

export const Title = () => {
    const [title, setTitle] = useState('');

    return (
        <div className="space-y-2">
            <Input
                id="title"
                placeholder="Enter your article title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                        {title.length > 10 ? 'Good title length' : 'Title should be more descriptive'}
                    </span>
                </div>
            )}
        </div>
    );
};
