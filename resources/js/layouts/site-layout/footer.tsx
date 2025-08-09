import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';
import { ArrowUp, Facebook, Github, Heart, Instagram, Linkedin, Rss, Twitter, Youtube } from 'lucide-react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="mt-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="mb-4 block text-2xl font-bold text-primary">
                            BlogHub
                        </Link>
                        <p className="mb-6 max-w-md text-muted-foreground">
                            A community-driven platform where developers, designers, and tech enthusiasts share knowledge, insights, and experiences
                            to help each other grow.
                        </p>

                        {/* Newsletter Signup */}
                        <div className="space-y-3">
                            <h4 className="font-semibold">Stay in the loop</h4>
                            <div className="flex max-w-sm space-x-2">
                                <Input placeholder="Enter your email" type="email" className="flex-1" />
                                <Button>Subscribe</Button>
                            </div>
                            <p className="text-xs text-muted-foreground">Get weekly updates on trending posts and new features.</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-4 font-semibold">Explore</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="text-muted-foreground transition-colors hover:text-foreground">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link href="/tags" className="text-muted-foreground transition-colors hover:text-foreground">
                                    Tags
                                </Link>
                            </li>
                            <li>
                                <Link href="/trending" className="text-muted-foreground transition-colors hover:text-foreground">
                                    Trending
                                </Link>
                            </li>
                            <li>
                                <Link href="/authors" className="text-muted-foreground transition-colors hover:text-foreground">
                                    Top Authors
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="mb-4 font-semibold">Resources</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/write" className="text-muted-foreground transition-colors hover:text-foreground">
                                    Write a Post
                                </Link>
                            </li>
                            <li>
                                <Link href="/guidelines" className="text-muted-foreground transition-colors hover:text-foreground">
                                    Writing Guidelines
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="text-muted-foreground transition-colors hover:text-foreground">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/api" className="text-muted-foreground transition-colors hover:text-foreground">
                                    API Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/markdown" className="text-muted-foreground transition-colors hover:text-foreground">
                                    Markdown Guide
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="mb-4 font-semibold">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-muted-foreground transition-colors hover:text-foreground">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground transition-colors hover:text-foreground">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="mb-8" />

                {/* Bottom Section */}
                <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                    {/* Copyright */}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <p>© {currentYear} BlogHub. All rights reserved.</p>
                        <span className="hidden md:inline">•</span>
                        <p className="hidden items-center md:flex">
                            Made with <Heart className="mx-1 h-4 w-4 text-red-500" /> by the community
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="https://twitter.com/bloghub" target="_blank" rel="noopener noreferrer">
                                    <Twitter className="h-4 w-4" />
                                    <span className="sr-only">Twitter</span>
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="https://github.com/bloghub" target="_blank" rel="noopener noreferrer">
                                    <Github className="h-4 w-4" />
                                    <span className="sr-only">GitHub</span>
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="https://linkedin.com/company/bloghub" target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="h-4 w-4" />
                                    <span className="sr-only">LinkedIn</span>
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="https://facebook.com/bloghub" target="_blank" rel="noopener noreferrer">
                                    <Facebook className="h-4 w-4" />
                                    <span className="sr-only">Facebook</span>
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="https://instagram.com/bloghub" target="_blank" rel="noopener noreferrer">
                                    <Instagram className="h-4 w-4" />
                                    <span className="sr-only">Instagram</span>
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="https://youtube.com/bloghub" target="_blank" rel="noopener noreferrer">
                                    <Youtube className="h-4 w-4" />
                                    <span className="sr-only">YouTube</span>
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/rss" target="_blank" rel="noopener noreferrer">
                                    <Rss className="h-4 w-4" />
                                    <span className="sr-only">RSS Feed</span>
                                </Link>
                            </Button>
                        </div>

                        <Separator orientation="vertical" className="h-6" />

                        {/* Back to Top */}
                        <Button variant="ghost" size="sm" onClick={scrollToTop} className="flex items-center space-x-1">
                            <ArrowUp className="h-4 w-4" />
                            <span className="text-sm">Top</span>
                        </Button>
                    </div>
                </div>

                {/* Mobile Copyright */}
                <div className="mt-4 text-center md:hidden">
                    <p className="flex items-center justify-center text-xs text-muted-foreground">
                        Made with <Heart className="mx-1 h-3 w-3 text-red-500" /> by the community
                    </p>
                </div>
            </div>
        </footer>
    );
};
