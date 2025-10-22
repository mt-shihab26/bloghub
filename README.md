# Bloghub

A comprehensive blogging platform built with Laravel, React, and TailwindCSS

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

```sh
git clone https://github.com/mt-shihab26/bloghub.git
```

2. **Go to project directory**

```sh
cd bloghub
```

3. **Create a new branch for your team**

```sh
git checkout -b <your-branch-name> # git checkout dev
```

4. **Install PHP dependencies**

```sh
composer install
```

5. **Install JavaScript dependencies**

```sh
bun install
```

6. **Environment setup**

```sh
cp .env.example .env
```

7. **Generate app key in .env file**

```sh
php artisan key:generate
```

8. **Database setup**

```sh
php artisan migrate
```

9. **Seed Database (optional)**

```sh
php artisan db:seed 
```

9. **Start the development server**

```sh
composer dev
```

10. **Open your browser**
    Navigate to [http://localhost:8000](http://localhost:8000) to see the application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
