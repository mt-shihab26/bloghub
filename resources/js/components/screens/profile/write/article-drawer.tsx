import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { Settings, Image, FileText } from 'lucide-react';

import { FeaturedImageUpload } from './featured-image-upload';
import { PublishingOptions } from './publishing-options';
import { WritingExcerpt } from './writing-excerpt';

export const ArticleDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen} direction="bottom">
            <DrawerTrigger asChild>
                <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Article Options
                </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh]">
                <div className="overflow-y-auto">
                    <div className="container mx-auto max-w-6xl">
                        <DrawerHeader>
                            <DrawerTitle>Article Options</DrawerTitle>
                            <DrawerDescription>
                                Configure your article's featured image, publishing options, and excerpt.
                            </DrawerDescription>
                        </DrawerHeader>

                        <div className="px-4 pb-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Featured Image Section */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Image className="w-5 h-5" />
                                    <h3 className="font-medium">Featured Image</h3>
                                </div>
                                <FeaturedImageUpload />
                            </div>

                            {/* Publishing Options Section */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Settings className="w-5 h-5" />
                                    <h3 className="font-medium">Publishing Options</h3>
                                </div>
                                <PublishingOptions />
                            </div>

                            {/* Article Excerpt Section */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <FileText className="w-5 h-5" />
                                    <h3 className="font-medium">Article Excerpt</h3>
                                </div>
                                <WritingExcerpt />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};