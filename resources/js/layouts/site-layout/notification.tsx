import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

export const Notification = () => {
    const count = 0;

    return (
        <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="h-5 w-5" />
            {count > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {count}
                </span>
            )}
        </Button>
    );
};
