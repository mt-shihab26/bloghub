import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/dropzone';
import { Sparkles, Image } from 'lucide-react';

export const FeaturedImage = () => {
    const [files, setFiles] = useState<File[] | undefined>();
    const [filePreview, setFilePreview] = useState<string | undefined>();
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDrop = (files: File[]) => {
        console.log(files);
        setFiles(files);

        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (typeof e.target?.result === 'string') {
                    setFilePreview(e.target?.result);
                }
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const generateImage = async () => {
        setIsGenerating(true);
        // Simulate AI image generation
        setTimeout(() => {
            // Use a placeholder service for demo
            const placeholderImage = `https://picsum.photos/800/400?random=${Math.floor(Math.random() * 1000)}`;
            setFilePreview(placeholderImage);
            setIsGenerating(false);
        }, 3000);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image className="w-5 h-5" />
                    <h3 className="font-medium">Featured Image</h3>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={generateImage}
                    disabled={isGenerating}
                    className="flex items-center gap-2"
                >
                    <Sparkles className="w-4 h-4" />
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                </Button>
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
                        <div className="h-[200px] w-full">
                            <img
                                alt="Preview"
                                className="absolute top-0 left-0 h-full w-full object-cover rounded"
                                src={filePreview}
                            />
                        </div>
                    )}
                </DropzoneContent>
            </Dropzone>
            <p className="text-xs text-muted-foreground">
                Upload an image or generate one with AI. Recommended: 1200x630px
            </p>
        </div>
    );
};