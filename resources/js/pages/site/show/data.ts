export const blogPost = {
    id: 1,
    title: "The Future of Web Development: What's Coming in 2024",
    content: `
    <p>Web development is evolving at an unprecedented pace, and 2024 promises to bring exciting new technologies and paradigms that will reshape how we build applications for the web.</p>

    <h2>The Rise of AI-Powered Development</h2>
    <p>Artificial Intelligence is no longer just a buzzword in web development. We're seeing AI tools that can generate code, optimize performance, and even help with debugging. Tools like GitHub Copilot and ChatGPT are becoming integral parts of developers' workflows.</p>

    <h2>WebAssembly Goes Mainstream</h2>
    <p>WebAssembly (WASM) is finally reaching maturity, allowing developers to run high-performance applications in the browser using languages like Rust, C++, and Go. This opens up new possibilities for web applications that were previously impossible.</p>

    <h2>The Evolution of JavaScript Frameworks</h2>
    <p>React, Vue, and Angular continue to evolve, but we're also seeing new players like Solid.js and Qwik gaining traction. These frameworks focus on performance and developer experience, pushing the boundaries of what's possible.</p>

    <h2>Edge Computing and Serverless</h2>
    <p>The move towards edge computing is accelerating, with platforms like Vercel Edge Functions and Cloudflare Workers making it easier to deploy code closer to users for better performance.</p>
  `,
    author: {
        name: 'Sarah Chen',
        avatar: '/woman-developer.png',
        username: 'sarahchen',
        bio: 'Full-stack developer passionate about creating beautiful, functional web applications.',
    },
    publishedAt: '2024-01-15',
    readTime: '5 min read',
    likes: 124,
    comments: 18,
    tags: ['Web Development', 'Technology', 'Future'],
    image: '/futuristic-web-development.png',
};

export const comments = [
    {
        id: 1,
        author: {
            name: 'Mike Johnson',
            avatar: '/man-programmer.png',
            username: 'mikej',
        },
        content:
            "Great article! I'm particularly excited about WebAssembly. Do you think it will eventually replace JavaScript for performance-critical applications?",
        publishedAt: '2 hours ago',
        likes: 12,
        replies: [
            {
                id: 2,
                author: {
                    name: 'Sarah Chen',
                    avatar: '/woman-developer.png',
                    username: 'sarahchen',
                },
                content:
                    "Thanks Mike! I don't think WASM will replace JavaScript entirely, but it will definitely complement it for specific use cases where performance is critical.",
                publishedAt: '1 hour ago',
                likes: 8,
            },
        ],
    },
    {
        id: 3,
        author: {
            name: 'Emily Rodriguez',
            avatar: '/woman-writer.png',
            username: 'emilyrod',
        },
        content:
            "The AI-powered development section really resonates with me. I've been using GitHub Copilot for a few months now and it's incredible how much it speeds up development.",
        publishedAt: '4 hours ago',
        likes: 7,
        replies: [],
    },
    {
        id: 4,
        author: {
            name: 'David Kim',
            avatar: '/man-database-engineer.png',
            username: 'davidkim',
        },
        content:
            'Edge computing is definitely the future. The performance improvements are noticeable, especially for global applications.',
        publishedAt: '6 hours ago',
        likes: 15,
        replies: [],
    },
];
