import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { useState } from 'react';
import { useWriteStore } from '@/states/use-write-store';
import { savePost } from '@/lib/links';
import { now } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Send, Calendar, CheckCircle, ChevronDown } from 'lucide-react';

export const Publish = () => {
    const { post } = useWriteStore();

    const [publishDate, setPublishDate] = useState('');
    const [publishTime, setPublishTime] = useState('');
    const [schedulePublish, setSchedulePublish] = useState(false);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    <Send className="w-4 h-4 mr-2" />
                    {post.status === 'published' ? 'Update' : 'Publish'}
                    <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuItem
                    onClick={() => savePost({ ...post, status: 'published', published_at: now() })}
                >
                    <Send className="w-4 h-4 mr-2" />
                    Publish Now
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="schedule-publish" className="font-medium">
                            Schedule Publishing
                        </Label>
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
                                    <Label htmlFor="publish-date" className="text-sm">
                                        Date
                                    </Label>
                                    <Input
                                        id="publish-date"
                                        type="date"
                                        value={publishDate}
                                        onChange={e => setPublishDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="publish-time" className="text-sm">
                                        Time
                                    </Label>
                                    <Input
                                        id="publish-time"
                                        type="time"
                                        value={publishTime}
                                        onChange={e => setPublishTime(e.target.value)}
                                    />
                                </div>
                            </div>
                            {publishDate && publishTime && (
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2 text-sm text-green-600">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>
                                            Scheduled for{' '}
                                            {new Date(
                                                publishDate + 'T' + publishTime,
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                    <Button
                                        className="w-full"
                                        onClick={() => console.log('Schedule publish')}
                                    >
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Schedule Publish
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
