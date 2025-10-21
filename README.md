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
