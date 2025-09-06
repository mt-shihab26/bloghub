import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export const Preview = () => {
    return (
        <Button variant="outline">
            <X className="w-4 h-4 mr-2" />
            Preview
        </Button>
    );
};
