import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ImageIcon, X, Upload, CheckCircle } from 'lucide-react';

export const FeaturedImageUpload = () => {
    const [featuredImage, setFeaturedImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real app, you'd upload to your server/cloud storage
            const imageUrl = URL.createObjectURL(file);
            setFeaturedImage(imageUrl);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const imageUrl = URL.createObjectURL(file);
                setFeaturedImage(imageUrl);
            }
        }
    };

    return (
        <div>
            <h2 className="flex items-center text-lg font-semibold mb-2">
                <ImageIcon className="w-5 h-5 mr-2" />
                Featured Image
            </h2>
            <p className="text-sm text-muted-foreground mb-4">Upload a cover image for your article</p>
                {featuredImage ? (
                    <div className="space-y-4">
                        <div className="relative">
                            <img
                                src={featuredImage || '/placeholder.svg'}
                                alt="Featured image"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <Button
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => setFeaturedImage(null)}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span>Featured image uploaded</span>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div
                            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('image-upload')?.click()}
                        >
                            <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
                            <p className="text-sm text-muted-foreground mb-3">
                                Drag and drop an image, or click to browse
                            </p>
                            <Button variant="outline" size="sm">
                                <Upload className="w-4 h-4 mr-2" />
                                Choose Image
                            </Button>
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Recommended: 1200x630px for best display across platforms
                        </p>
                    </div>
                )}
        </div>
    );
};
