import type { TShowPost } from '@/types/home';

import { postLink } from '@/lib/links';
import { toast } from '@/lib/toast';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Copy, MessageSquare, Share2 } from 'lucide-react';

export const Share = ({ post }: { post: TShowPost }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);

    const postUrl = postLink(post.user, post);
    const shareText = `Check out this post: ${post.title}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(postUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareToTwitter = () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(postUrl)}`;
        window.open(url, '_blank');
    };

    const shareToFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
        window.open(url, '_blank');
    };

    const shareToWhatsApp = () => {
        const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${postUrl}`)}`;
        window.open(url, '_blank');
    };

    const shareNative = async () => {
        if (!navigator.share) {
            toast.warning('Sharing is not supported on this device');
            return;
        }
        try {
            await navigator.share({
                title: post.title,
                text: shareText,
                url: postUrl,
            });
        } catch (err: unknown) {
            toast.warning('Unable to share at this time', {
                description: err instanceof Error ? err.message : 'Unknown error',
            });
        }
    };

    return (
        <>
            <Button variant="ghost" onClick={() => setIsOpen(true)}>
                <Share2 className="mr-2 h-5 w-5" />
                Share
            </Button>

            {/* Modal Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={() => setIsOpen(false)}
                >
                    <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Share this post</h3>
                            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                                ×
                            </Button>
                        </div>

                        {/* URL Copy Section */}
                        <div className="mb-6">
                            <div className="flex items-center space-x-2 rounded-lg bg-gray-50 p-3">
                                <input
                                    type="text"
                                    value={postUrl}
                                    readOnly
                                    className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
                                />
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={copyToClipboard}
                                    className={copied ? 'text-green-600' : ''}
                                >
                                    <Copy className="mr-1 h-4 w-4" />
                                    {copied ? 'Copied!' : 'Copy'}
                                </Button>
                            </div>
                        </div>

                        {/* Share Buttons */}
                        <div className="space-y-2">
                            {/* Native Share (if supported) */}
                            <Button variant="outline" className="w-full justify-start" onClick={shareNative}>
                                <Share2 className="mr-3 h-4 w-4" />
                                Share via device
                            </Button>

                            <Button variant="outline" className="w-full justify-start" onClick={shareToTwitter}>
                                <svg className="mr-3 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                                Share on Twitter
                            </Button>

                            <Button variant="outline" className="w-full justify-start" onClick={shareToFacebook}>
                                <svg className="mr-3 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Share on Facebook
                            </Button>

                            <Button variant="outline" className="w-full justify-start" onClick={shareToWhatsApp}>
                                <MessageSquare className="mr-3 h-4 w-4" />
                                Share on WhatsApp
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
