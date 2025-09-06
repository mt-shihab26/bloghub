import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { formatDateTime } from '@/lib/format';
import { useState } from 'react';
import { useWriteStore } from '@/states/use-write-store';
import { savePost } from '@/lib/links';
import { createDateTime, extractDate, extractTime, now, safeDate } from '@/lib/utils';
import { isScheduled } from '@/lib/post';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Send, CalendarIcon, CheckCircle, ChevronDown } from 'lucide-react';

export const Publish = () => {
    const { post, setPostKey } = useWriteStore();

    const scheduled = isScheduled(post);

    const [open, setOpen] = useState(scheduled);

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
                        <Switch id="schedule-publish" checked={open} onCheckedChange={setOpen} />
                    </div>
                    {open && (
                        <div className="space-y-3">
                            <Calendar
                                mode="single"
                                selected={safeDate(post.published_at)}
                                captionLayout="dropdown"
                                onSelect={selectDate => {
                                    if (!selectDate) return;
                                    const date = extractDate(selectDate);
                                    const time = extractTime(post.published_at);
                                    setPostKey('published_at', createDateTime(date, time) || null);
                                }}
                            />
                            <Label htmlFor="time-picker" className="px-1">
                                Time
                            </Label>
                            <Input
                                type="time"
                                id="time-picker"
                                step="1"
                                value={extractTime(post.published_at)}
                                onChange={e => {
                                    const date = post.published_at
                                        ? extractDate(post.published_at)
                                        : extractDate(now());
                                    setPostKey(
                                        'published_at',
                                        createDateTime(date, e.target.value) || null,
                                    );
                                }}
                                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                            />
                            {scheduled && (
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2 text-sm text-green-600">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>
                                            Scheduled for {formatDateTime(post.published_at)}
                                        </span>
                                    </div>
                                    <Button
                                        className="w-full"
                                        onClick={() => {
                                            savePost({
                                                ...post,
                                                status: 'published',
                                                published_at: post.published_at,
                                            });
                                            setOpen(false);
                                        }}
                                    >
                                        <CalendarIcon className="w-4 h-4 mr-2" />
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
