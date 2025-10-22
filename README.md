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

2. **Create a new branch for your team**

```sh
git checkout -b <your-branch-name> # git checkout dev
```

3. **Install PHP dependencies**

```sh
composer install
```

4. **Install JavaScript dependencies**

```sh
bun install
```

5. **Environment setup**

```sh
cp .env.example .env
```

6. **Generate app key on .env file**

```sh
php artisan key:generate
```

6. **Database setup**

```sh
php artisan migrate --seed
```

7. **Start the development server**

```sh
composer dev
```

8. **Open your browser**
   Navigate to [http://localhost:8000](http://localhost:8000) to see the application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
