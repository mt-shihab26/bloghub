import { WritingTitle } from './writing-title';
import { WritingContent } from './writing-content';

export const Writing = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold mb-2">Create Your Story</h1>
                <div className="space-y-3">
                    <div className="text-muted-foreground">Share your knowledge and insights with the community.</div>
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
                </div>
            </div>
            <WritingTitle />
            <WritingContent />
        </div>
    );
};
