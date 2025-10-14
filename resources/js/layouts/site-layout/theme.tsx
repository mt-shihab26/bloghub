import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

import { Monitor, Moon, Sun } from 'lucide-react';

export const Theme = () => {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <div className="flex gap-1 px-2 py-1">
            <button
                onClick={() => updateAppearance('light')}
                className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
                    appearance === 'light'
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
                title="Light mode"
            >
                <Sun className="h-4 w-4" />
            </button>
            <button
                onClick={() => updateAppearance('dark')}
                className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
                    appearance === 'dark'
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
                title="Dark mode"
            >
                <Moon className="h-4 w-4" />
            </button>
            <button
                onClick={() => updateAppearance('system')}
                className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
                    appearance === 'system'
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
                title="System theme"
            >
                <Monitor className="h-4 w-4" />
            </button>
        </div>
    );
};
