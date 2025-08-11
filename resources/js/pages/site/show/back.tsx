import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';

export const Back = () => {
    const handleBack = () => {
        window.history.back();
    };

    return (
        <Button variant="ghost" onClick={handleBack}>
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back
        </Button>
    );
};
