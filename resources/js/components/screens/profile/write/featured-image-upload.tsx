import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ImageIcon, X, Upload, CheckCircle } from 'lucide-react';

export const FeaturedImageUpload = () => {
    const [featuredImage, setFeaturedImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real app, you'd upload to your server/cloud storage
            const imageUrl = URL.createObjectURL(file);
            setFeaturedImage(imageUrl);
            setFileName(file.name);
        }
    };

    return (
        <div>
            
            {featuredImage ? (
                <div className="space-y-3">
                    <div className="relative">
                        <img
                            src={featuredImage}
                            alt="Featured image"
                            className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => {
                                setFeaturedImage(null);
                                setFileName(null);
                            }}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>{fileName}</span>
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    <Button 
                        variant="outline" 
                        onClick={() => document.getElementById('image-upload')?.click()}
                        className="w-full"
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Featured Image
                    </Button>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                    <p className="text-xs text-muted-foreground">
                        Recommended: 1200x630px for best display across platforms
                    </p>
                </div>
            )}
        </div>
    );
};
