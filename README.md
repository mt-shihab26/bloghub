# Bloghub

A comprehensive blogging platform built with Laravel. Bloghub empowers developers, designers, and tech enthusiasts to share knowledge, discover content, and build meaningful connections through writing.

## Getting Started

### Prerequisites

- PHP 8.2+
- Composer
- SQLite
- Node.js
- Bun
- Typesense

### Installation

1. **Clone the repository**

```shellscript
git clone https://github.com/mt-shihab26/bloghub.git
cd bloghub
```

2. **Create a new branch for your team**

```shellscript
git checkout -b your-branch-name
```

Replace `your-branch-name` with a descriptive name for your team's work (e.g., `team-alpha`, `feature/new-editor`, etc.)

3. **Install PHP dependencies**

```shellscript
composer install
```

4. **Install TypeScript dependencies**

```shellscript
bun install
```

5. **Environment setup**

```shellscript
cp .env.example .env
php artisan key:generate
```

6. **Database setup**

```shellscript
php artisan migrate --seed
```

7. **Start the development server**

```shellscript
composer dev
```

8. **Start assets development server**

```shellscript
bun dev
```

9. **Open your browser**
   Navigate to [http://localhost:8000](http://localhost:8000) to see the application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
