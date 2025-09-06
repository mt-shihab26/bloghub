import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WritingTitle } from './writing-title';
import { WritingContent } from './writing-content';

export const Writing = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Your Story</CardTitle>
                <CardDescription className="space-y-3">
                    <div>Share your knowledge and insights with the community.</div>
                    <div className="text-sm">
                        <div className="font-medium mb-2">This editor supports:</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <span className="text-blue-500">📝</span>
                                <span>GitHub Flavored Markdown</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-500">🔢</span>
                                <span>LaTeX Math Equations</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-purple-500">📈</span>
                                <span>Mermaid Diagrams</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-orange-500">🎯</span>
                                <span>Code Syntax Highlighting</span>
                            </div>
                        </div>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <WritingTitle />
                <WritingContent />
            </CardContent>
        </Card>
    );
};
