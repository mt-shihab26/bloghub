import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Save, Send, X, Calendar, CheckCircle } from 'lucide-react';

export const Header = () => {
    const [isDraft, setIsDraft] = useState(true);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [publishDate, setPublishDate] = useState('');
    const [publishTime, setPublishTime] = useState('');
    const [schedulePublish, setSchedulePublish] = useState(false);

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
            <div className="h-[4.45rem] flex items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>Last saved: {formatLastSaved(lastSaved)}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Calendar className="w-4 h-4 mr-2" />
                                Schedule
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-80" align="end">
                            <div className="p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="schedule-publish" className="font-medium">Schedule Publishing</Label>
                                    <Switch 
                                        id="schedule-publish" 
                                        checked={schedulePublish} 
                                        onCheckedChange={setSchedulePublish} 
                                    />
                                </div>
                                {schedulePublish && (
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <Label htmlFor="publish-date" className="text-sm">Date</Label>
                                                <Input
                                                    id="publish-date"
                                                    type="date"
                                                    value={publishDate}
                                                    onChange={(e) => setPublishDate(e.target.value)}
                                                    min={new Date().toISOString().split('T')[0]}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="publish-time" className="text-sm">Time</Label>
                                                <Input
                                                    id="publish-time"
                                                    type="time"
                                                    value={publishTime}
                                                    onChange={(e) => setPublishTime(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        {publishDate && publishTime && (
                                            <div className="flex items-center space-x-2 text-sm text-green-600">
                                                <CheckCircle className="w-4 h-4" />
                                                <span>
                                                    Scheduled for {new Date(publishDate + 'T' + publishTime).toLocaleString()}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                        {schedulePublish && publishDate && publishTime ? 'Schedule' : isDraft ? 'Publish' : 'Update'}
                    </Button>
                </div>
            </div>
        </div>
    );
};
