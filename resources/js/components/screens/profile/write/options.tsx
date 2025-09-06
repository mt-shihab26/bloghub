import { useState } from 'react';

import type React from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { X, CheckCircle, Calendar } from 'lucide-react';

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Settings, Image } from 'lucide-react';

import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/dropzone';

export const Options = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [files, setFiles] = useState<File[] | undefined>();
    const [filePreview, setFilePreview] = useState<string | undefined>();

    const handleDrop = (files: File[]) => {
        console.log(files);
        setFiles(files);

        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = e => {
                if (typeof e.target?.result === 'string') {
                    setFilePreview(e.target?.result);
                }
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState('');
    const [category, setCategory] = useState('');
    const [slug, setSlug] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [publishTime, setPublishTime] = useState('');
    const [schedulePublish, setSchedulePublish] = useState(false);
    const [isDraft, setIsDraft] = useState(true);

    const addTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    const formatSlug = (value: string) => {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedSlug = formatSlug(e.target.value);
        setSlug(formattedSlug);
    };

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen} direction="bottom">
            <DrawerTrigger asChild>
                <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Options
                </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh]">
                <div className="overflow-y-auto">
                    <div className="container mx-auto max-w-6xl">
                        <DrawerHeader>
                            <DrawerTitle>Article Options</DrawerTitle>
                            <DrawerDescription>
                                Configure your article's featured image and publishing options.
                            </DrawerDescription>
                        </DrawerHeader>

                        <div className="px-4 pb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Featured Image Section */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Image className="w-5 h-5" />
                                        <h3 className="font-medium">Featured Image</h3>
                                    </div>
                                    <Dropzone
                                        accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                                        onDrop={handleDrop}
                                        onError={console.error}
                                        src={files}
                                    >
                                        <DropzoneEmptyState />
                                        <DropzoneContent>
                                            {filePreview && (
                                                <div className="h-[102px] w-full">
                                                    <img
                                                        alt="Preview"
                                                        className="absolute top-0 left-0 h-full w-full object-cover"
                                                        src={filePreview}
                                                    />
                                                </div>
                                            )}
                                        </DropzoneContent>
                                    </Dropzone>
                                </div>

                                {/* Publishing Options Section */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Settings className="w-5 h-5" />
                                        <h3 className="font-medium">Publishing Options</h3>
                                    </div>
                                    <div>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="category">Category *</Label>
                                                <Select
                                                    value={category}
                                                    onValueChange={setCategory}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="web-development">
                                                            Web Development
                                                        </SelectItem>
                                                        <SelectItem value="mobile-development">
                                                            Mobile Development
                                                        </SelectItem>
                                                        <SelectItem value="data-science">
                                                            Data Science
                                                        </SelectItem>
                                                        <SelectItem value="devops">
                                                            DevOps
                                                        </SelectItem>
                                                        <SelectItem value="design">
                                                            Design
                                                        </SelectItem>
                                                        <SelectItem value="career">
                                                            Career
                                                        </SelectItem>
                                                        <SelectItem value="tutorial">
                                                            Tutorial
                                                        </SelectItem>
                                                        <SelectItem value="opinion">
                                                            Opinion
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {category && (
                                                    <div className="flex items-center space-x-2 text-sm text-green-600">
                                                        <CheckCircle className="w-4 h-4" />
                                                        <span>Category selected</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="slug">Article Slug</Label>
                                                <Input
                                                    id="slug"
                                                    placeholder="my-awesome-article"
                                                    value={slug}
                                                    onChange={handleSlugChange}
                                                />
                                                <p className="text-xs text-muted-foreground">
                                                    URL-friendly version of your title. Only
                                                    lowercase letters, numbers, and hyphens allowed.
                                                </p>
                                                {slug && (
                                                    <div className="flex items-center space-x-2 text-sm text-green-600">
                                                        <CheckCircle className="w-4 h-4" />
                                                        <span>Slug: /blog/{slug}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="tags">Tags ({tags.length}/5)</Label>
                                                <div className="flex space-x-2">
                                                    <Input
                                                        id="tags"
                                                        placeholder="Add a tag..."
                                                        value={newTag}
                                                        onChange={e => setNewTag(e.target.value)}
                                                        onKeyPress={handleKeyPress}
                                                        disabled={tags.length >= 5}
                                                    />
                                                    <Button
                                                        onClick={addTag}
                                                        size="sm"
                                                        disabled={
                                                            tags.length >= 5 || !newTag.trim()
                                                        }
                                                    >
                                                        Add
                                                    </Button>
                                                </div>
                                                {tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {tags.map(tag => (
                                                            <Badge
                                                                key={tag}
                                                                variant="secondary"
                                                                className="flex items-center gap-1"
                                                            >
                                                                #{tag}
                                                                <X
                                                                    className="w-3 h-3 cursor-pointer hover:text-destructive"
                                                                    onClick={() => removeTag(tag)}
                                                                />
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}
                                                {tags.length > 0 && (
                                                    <div className="flex items-center space-x-2 text-sm text-green-600">
                                                        <CheckCircle className="w-4 h-4" />
                                                        <span>Tags added</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <Label
                                                        htmlFor="schedule-publish"
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Calendar className="w-4 h-4" />
                                                        Schedule Publishing
                                                    </Label>
                                                    <Switch
                                                        id="schedule-publish"
                                                        checked={schedulePublish}
                                                        onCheckedChange={setSchedulePublish}
                                                    />
                                                </div>
                                                {schedulePublish && (
                                                    <div className="space-y-3 p-3 border rounded-lg bg-muted/20">
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div className="space-y-1">
                                                                <Label
                                                                    htmlFor="publish-date"
                                                                    className="text-sm"
                                                                >
                                                                    Date
                                                                </Label>
                                                                <Input
                                                                    id="publish-date"
                                                                    type="date"
                                                                    value={publishDate}
                                                                    onChange={e =>
                                                                        setPublishDate(
                                                                            e.target.value,
                                                                        )
                                                                    }
                                                                    min={
                                                                        new Date()
                                                                            .toISOString()
                                                                            .split('T')[0]
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <Label
                                                                    htmlFor="publish-time"
                                                                    className="text-sm"
                                                                >
                                                                    Time
                                                                </Label>
                                                                <Input
                                                                    id="publish-time"
                                                                    type="time"
                                                                    value={publishTime}
                                                                    onChange={e =>
                                                                        setPublishTime(
                                                                            e.target.value,
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        {publishDate && publishTime && (
                                                            <div className="flex items-center space-x-2 text-sm text-green-600">
                                                                <CheckCircle className="w-4 h-4" />
                                                                <span>
                                                                    Scheduled for{' '}
                                                                    {new Date(
                                                                        publishDate +
                                                                            'T' +
                                                                            publishTime,
                                                                    ).toLocaleString()}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id="draft-mode"
                                                    checked={isDraft}
                                                    onCheckedChange={setIsDraft}
                                                />
                                                <Label htmlFor="draft-mode">Save as draft</Label>
                                            </div>

                                            <div className="pt-4 border-t">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span>Status:</span>
                                                    <Badge
                                                        variant={isDraft ? 'secondary' : 'default'}
                                                    >
                                                        {isDraft ? 'Draft' : 'Ready to Publish'}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};
