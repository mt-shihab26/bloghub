# Bloghub

A comprehensive blogging platform built with Laravel, React, and TailwindCSS. Bloghub empowers developers, designers, and tech enthusiasts to share knowledge, discover content, and build meaningful connections through writing.

## Features

### **Content Discovery**

- **AI-powered recommendations** based on user interests and reading history
- **Trending topics** and featured articles on the homepage
- **Advanced search** with filters for categories, tags, authors, and dates
- **Personalized feed** tailored to followed categories and tags


### **Rich Writing Experience**

- **Markdown editor** with live preview and syntax highlighting
- **Drag-and-drop image uploads** for featured images and content
- **Tag management system** for better content organization
- **Draft/publish workflow** with auto-save functionality
- **Writing tips and markdown guide** integrated into the editor


### ️ **Advanced Organization**

- **Categories system** with dedicated pages and statistics
- **Tags system** with trending indicators and follow functionality
- **Content filtering** by category, tag, popularity, and date
- **Related content suggestions** based on tags and categories


### **Social Features**

- **Author profiles** with bio, stats, and activity feeds
- **Follow system** for authors, categories, and tags
- **Interactive comments** with nested replies and reactions
- **Like and bookmark** functionality for content curation
- **Social sharing** integration across platforms


### **Modern UI/UX**

- **Responsive design** that works seamlessly on all devices
- **Clean, accessible interface** built with shadcn/ui components
- **Dark/light mode support** (ready for implementation)
- **Smooth animations** and micro-interactions
- **Optimized performance** with Next.js 15 features


## ️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Image Handling**: Next.js Image Optimization
- **State Management**: React Hooks (useState, useEffect)


## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm


### Installation

1. **Clone the repository**

```shellscript
git clone https://github.com/yourusername/bloghub.git
cd bloghub
```


2. **Install dependencies**

```shellscript
npm install
# or
yarn install
# or
pnpm install
```


3. **Run the development server**

```shellscript
npm run dev
# or
yarn dev
# or
pnpm dev
```


4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.


## Project Structure

```plaintext
bloghub/
├── app/                    # Next.js 15 App Router
│   ├── author/            # Author profile pages
│   ├── blog/              # Individual blog post pages
│   ├── category/          # Category pages
│   ├── tag/               # Tag pages
│   ├── categories/        # Categories directory
│   ├── tags/              # Tags directory
│   ├── write/             # Blog post editor
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/                # shadcn/ui components
│   └── footer.tsx         # Footer component
├── public/                # Static assets
└── README.md
```

## Key Pages

- **Homepage** (`/`) - Personalized feed with recommendations
- **Categories** (`/categories`) - Browse all content categories
- **Tags** (`/tags`) - Explore trending and popular tags
- **Author Profiles** (`/author/[username]`) - User profiles with posts and stats
- **Blog Posts** (`/blog/[id]`) - Individual articles with comments
- **Write** (`/write`) - Rich markdown editor for creating content
- **Category Pages** (`/category/[slug]`) - Category-specific content
- **Tag Pages** (`/tag/[slug]`) - Tag-specific content


## Customization

### Adding New Categories

Update the categories data in the respective page components to add new content categories.

### Styling

The project uses Tailwind CSS with shadcn/ui. Customize the theme in `tailwind.config.ts` and component styles throughout the application.

### Components

All UI components are built with shadcn/ui and can be customized in the `components/ui/` directory.

## Roadmap

- **Authentication System** - User registration and login
- **Database Integration** - PostgreSQL/MongoDB for data persistence
- **Real-time Features** - Live notifications and comments
- **Advanced Search** - Full-text search with Elasticsearch
- **Content Analytics** - View counts, engagement metrics
- **Email Notifications** - Newsletter and activity updates
- **Mobile App** - React Native companion app
- **API Documentation** - RESTful API for third-party integrations


## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the clean, consistent icons


## Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Join our [Discord community](https://discord.gg/bloghub)
- Follow us on [Twitter](https://twitter.com/bloghub)


---

**Built with ❤️ by the BlogHub community**
