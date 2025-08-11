import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

export const ZenMode = ({ value = false, onClick }: { value?: boolean; onClick?: () => void }) => {
    return (
        <Button variant="outline" size="sm" onClick={onClick} className="flex items-center space-x-2">
            {value ? (
                <>
                    <EyeOff className="h-4 w-4" />
                    <span>Exit Zen</span>
                </>
            ) : (
                <>
                    <Eye className="h-4 w-4" />
                    <span>Zen Mode</span>
                </>
            )}
        </Button>
    );
};
