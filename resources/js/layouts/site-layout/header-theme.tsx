import { useAppearance } from '@/hooks/use-appearance';

import { Button } from '@/components/ui/button';
import { Monitor, Moon, Sun } from 'lucide-react';

export const HeaderTheme = () => {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <Button variant="ghost" size="icon" onClick={() => updateAppearance(appearance === 'light' ? 'dark' : 'light')}>
            {appearance === 'system' && <Monitor className="h-5 w-5" />}
            {appearance === 'light' && <Moon className="h-5 w-5" />}
            {appearance === 'dark' && <Sun className="h-5 w-5" />}
        </Button>
    );
};
