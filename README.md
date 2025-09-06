# Bloghub

A comprehensive blogging platform built with Laravel. Bloghub empowers developers, designers, and tech enthusiasts to share knowledge, discover content, and build meaningful connections through writing.

## Features

### [ ] / - Home page

- [ ] **Advanced search** with filters for categories, tags, authors, and dates
- [ ] **AI-powered recommendations** based on user interests and reading history and **Personalized feed** tailored to followed categories and tags
- [ ] **Trending categories** on the home page
- [ ] **Trending tags** and featured articles on the homepage

### [x] /{username}/{post:slug} - Blog post show page

- [x] zen mode post reading implemented
- [x] showing tags, authors info, featured image on top
- [x] rendering markdown content of post with `streamdown` response package
- [x] love, comments, bookmark and share actions toolbar.
- [x] showing authors details
- [x] implement recursive comments of post.

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
- **Optimized performance** with Laravel's built-in optimizations

## ️ Tech Stack

- **Language**: PHP, TypeScript
- **Framework**: Laravel, React, Inertia.js
- **Database**: SQLite, Redis
- **Styling**: Tailwind CSS, shadcn/ui

## Getting Started

### Prerequisites

- PHP 8.2+
- Composer
- SQLite
- Node.js
- Bun
- Redis

### Installation

1. **Clone the repository**

```shellscript
git clone https://github.com/mt-shihab26/bloghub.git
cd bloghub
```

2. **Install PHP dependencies**

```shellscript
composer install
```

3. **Install TypeScript dependencies**

```shellscript
bun install
```

4. **Environment setup**

```shellscript
cp .env.example .env
php artisan key:generate
```

5. **Database setup**

```shellscript
php artisan migrate --seed
```

7. **Start the development server**

```shellscript
composer dev
```

6. **Start assets development server**

```shellscript
bun dev
```

8. **Open your browser**
   Navigate to [http://localhost:8000](http://localhost:8000) to see the application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
