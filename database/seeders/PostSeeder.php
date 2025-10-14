<?php

namespace Database\Seeders;

use App\Enums\PostStatus;
use App\Models\Category;
use App\Models\Image;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::query()->get();
        $categories = Category::query()->whereNull('category_id')->get();

        $posts = [
            [
                'user' => 'sarah_dev',
                'category' => 'web-development',
                'title' => 'Building Scalable Laravel Applications: Best Practices and Patterns',
                'excerpt' => 'Learn essential architectural patterns and best practices for building Laravel applications that scale with your business needs.',
                'tags' => ['laravel', 'php', 'design-patterns', 'clean-code'],
                'content' => "# Building Scalable Laravel Applications

Scalability is a crucial consideration when building modern web applications. In this comprehensive guide, we'll explore proven patterns and practices for building Laravel applications that can grow with your business.

## Understanding Scalability

Scalability isn't just about handling more users—it's about building systems that can adapt to changing requirements while maintaining performance and reliability.

### Key Principles

1. **Separation of Concerns**: Keep your business logic separate from your framework code
2. **Dependency Injection**: Use Laravel's service container effectively
3. **Caching Strategy**: Implement multi-layer caching for optimal performance
4. **Queue Everything**: Move time-consuming tasks to background jobs

## Repository Pattern

The repository pattern provides an abstraction layer between your application and data access logic:

```php
class UserRepository
{
    public function findActive()
    {
        return User::where('active', true)->get();
    }
}
```

## Service Layer

Services encapsulate complex business logic:

```php
class OrderService
{
    public function __construct(
        private OrderRepository \$orderRepo,
        private PaymentGateway \$payment
    ) {}

    public function processOrder(Order \$order)
    {
        // Complex business logic here
    }
}
```

## Conclusion

Building scalable applications requires thoughtful architecture and consistent patterns. Start with these foundations and iterate as your needs evolve.",
                'status' => PostStatus::PUBLISHED,
                'published_at' => now()->subDays(2),
            ],
            [
                'user' => 'mike_tech',
                'category' => 'frontend-development',
                'title' => 'Mastering React Hooks: A Complete Guide',
                'excerpt' => 'Deep dive into React Hooks and learn how to write cleaner, more maintainable functional components.',
                'tags' => ['react', 'javascript', 'typescript'],
                'content' => "# Mastering React Hooks

React Hooks revolutionized how we write React components. Let's explore the most important hooks and when to use them.

## useState: Managing Component State

The most basic hook for adding state to functional components:

```javascript
const [count, setCount] = useState(0);
```

## useEffect: Side Effects Made Easy

Handle side effects like data fetching, subscriptions, and DOM manipulation:

```javascript
useEffect(() => {
  fetchData();
  return () => cleanup();
}, [dependencies]);
```

## Custom Hooks

Create reusable logic with custom hooks:

```javascript
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
```

## Best Practices

1. Follow the Rules of Hooks
2. Keep hooks at the top level
3. Name custom hooks with 'use' prefix
4. Optimize with useMemo and useCallback when needed

Hooks make React development more intuitive and fun!",
                'status' => PostStatus::PUBLISHED,
                'published_at' => now()->subDays(5),
            ],
            [
                'user' => 'emily_writes',
                'category' => 'tutorials',
                'title' => 'Building a REST API with Laravel: Step-by-Step Tutorial',
                'excerpt' => 'Complete guide to building a production-ready REST API with Laravel, including authentication, validation, and testing.',
                'tags' => ['laravel', 'api', 'rest', 'testing'],
                'content' => "# Building a REST API with Laravel

In this tutorial, we'll build a complete REST API from scratch using Laravel's powerful features.

## Setting Up

First, create a new Laravel project:

```bash
composer create-project laravel/laravel blog-api
cd blog-api
```

## Creating Resources

Use Laravel's API resources for consistent JSON responses:

```php
class PostResource extends JsonResource
{
    public function toArray(\$request)
    {
        return [
            'id' => \$this->id,
            'title' => \$this->title,
            'content' => \$this->content,
            'author' => new UserResource(\$this->user),
            'created_at' => \$this->created_at,
        ];
    }
}
```

## Authentication

Implement API authentication with Laravel Sanctum:

```php
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('posts', PostController::class);
});
```

## Validation

Create Form Requests for validation:

```php
class StorePostRequest extends FormRequest
{
    public function rules()
    {
        return [
            'title' => 'required|max:255',
            'content' => 'required',
        ];
    }
}
```

## Testing

Write comprehensive tests:

```php
it('creates a new post', function () {
    \$user = User::factory()->create();

    \$response = \$this->actingAs(\$user)
        ->postJson('/api/posts', [
            'title' => 'Test Post',
            'content' => 'Test content',
        ]);

    \$response->assertCreated();
});
```

Your API is now ready for production!",
                'status' => PostStatus::PUBLISHED,
                'published_at' => now()->subDays(7),
            ],
            [
                'user' => 'alex_backend',
                'category' => 'database-data',
                'title' => 'Database Optimization Techniques for High-Traffic Applications',
                'excerpt' => 'Learn how to optimize your database queries and schema design for maximum performance under heavy load.',
                'tags' => ['mysql', 'postgresql', 'performance', 'optimization'],
                'content' => "# Database Optimization Techniques

Database performance is critical for high-traffic applications. Let's explore proven optimization strategies.

## Indexing Strategy

Proper indexing is the foundation of database performance:

```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_user_published ON posts(user_id, published_at);
```

## Query Optimization

Avoid N+1 queries with eager loading:

```php
// Bad
\$posts = Post::all();
foreach (\$posts as \$post) {
    echo \$post->user->name; // N+1 problem
}

// Good
\$posts = Post::with('user')->get();
```

## Caching Strategies

1. **Query Caching**: Cache expensive queries
2. **Model Caching**: Cache entire model instances
3. **Redis**: Use Redis for session and cache storage

```php
\$posts = Cache::remember('posts.recent', 3600, function () {
    return Post::latest()->take(10)->get();
});
```

## Connection Pooling

Use connection pooling for better resource utilization in production environments.

## Conclusion

Database optimization is an ongoing process. Monitor, measure, and iterate continuously.",
                'status' => PostStatus::PUBLISHED,
                'published_at' => now()->subDays(10),
            ],
            [
                'user' => 'jessica_ux',
                'category' => 'frontend-development',
                'title' => 'Creating Accessible Web Applications: A Developer\'s Guide',
                'excerpt' => 'Make your web applications accessible to everyone with these essential accessibility practices and techniques.',
                'tags' => ['javascript', 'react', 'performance'],
                'content' => "# Creating Accessible Web Applications

Accessibility isn't optional—it's essential. Let's explore how to build web applications that everyone can use.

## Semantic HTML

Use the right HTML elements for the job:

```html
<!-- Good -->
<button onClick={handleClick}>Submit</button>

<!-- Bad -->
<div onClick={handleClick}>Submit</div>
```

## ARIA Attributes

Enhance accessibility with ARIA when semantic HTML isn't enough:

```jsx
<div
  role=\"button\"
  tabIndex={0}
  aria-label=\"Close dialog\"
  onClick={handleClose}
  onKeyPress={handleKeyPress}
>
  ×
</div>
```

## Keyboard Navigation

Ensure all functionality is keyboard accessible:

```javascript
function handleKeyPress(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    handleAction();
  }
}
```

## Color Contrast

Maintain WCAG 2.1 AA standards:
- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio

## Testing Tools

1. axe DevTools
2. WAVE Browser Extension
3. Screen readers (NVDA, JAWS, VoiceOver)

## Conclusion

Building accessible applications benefits everyone and is the right thing to do.",
                'status' => PostStatus::PUBLISHED,
                'published_at' => now()->subDays(12),
            ],
            [
                'user' => 'david_devops',
                'category' => 'devops-infrastructure',
                'title' => 'Kubernetes Deployment Strategies: Rolling, Blue-Green, and Canary',
                'excerpt' => 'Master different deployment strategies in Kubernetes to achieve zero-downtime deployments.',
                'tags' => ['kubernetes', 'docker', 'devops', 'ci-cd'],
                'content' => "# Kubernetes Deployment Strategies

Zero-downtime deployments are crucial for production applications. Let's explore different strategies in Kubernetes.

## Rolling Deployment

The default strategy that gradually replaces old pods:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
```

## Blue-Green Deployment

Run two identical environments and switch traffic:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app
spec:
  selector:
    app: my-app
    version: blue  # Switch to 'green' when ready
```

## Canary Deployment

Gradually roll out to a subset of users:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: my-app
spec:
  http:
  - match:
    - headers:
        canary:
          exact: \"true\"
    route:
    - destination:
        host: my-app
        subset: v2
  - route:
    - destination:
        host: my-app
        subset: v1
      weight: 90
    - destination:
        host: my-app
        subset: v2
      weight: 10
```

## Health Checks

Always implement proper health checks:

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 30
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
```

Choose the right strategy for your use case!",
                'status' => PostStatus::PUBLISHED,
                'published_at' => now()->subDays(15),
            ],
            [
                'user' => 'lisa_mobile',
                'category' => 'mobile-development',
                'title' => 'Building Cross-Platform Apps with React Native',
                'excerpt' => 'Learn how to build beautiful, performant mobile applications for iOS and Android using React Native.',
                'tags' => ['react-native', 'react', 'mobile', 'javascript'],
                'content' => "# Building Cross-Platform Apps with React Native

React Native enables you to build truly native mobile apps using React. Let's explore the fundamentals.

## Setting Up

Initialize a new React Native project:

```bash
npx react-native init MyApp
cd MyApp
npm start
```

## Core Components

React Native provides native components:

```jsx
import { View, Text, Image, ScrollView } from 'react-native';

function ProfileScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{uri: 'https://example.com/avatar.jpg'}} />
        <Text style={styles.name}>John Doe</Text>
      </View>
    </ScrollView>
  );
}
```

## Navigation

Use React Navigation for routing:

```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name=\"Home\" component={HomeScreen} />
        <Stack.Screen name=\"Profile\" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## Platform-Specific Code

Handle platform differences:

```jsx
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: Platform.OS === 'ios' ? 20 : 10,
  }
});
```

## Performance Tips

1. Use FlatList for long lists
2. Implement shouldComponentUpdate
3. Optimize images
4. Use native driver for animations

React Native makes mobile development accessible to web developers!",
                'status' => PostStatus::PUBLISHED,
                'published_at' => now()->subDays(18),
            ],
            [
                'user' => 'james_security',
                'category' => 'security-privacy',
                'title' => 'Essential Security Practices for Modern Web Applications',
                'excerpt' => 'Protect your applications and users with these fundamental security practices every developer should know.',
                'tags' => ['security', 'authentication', 'encryption'],
                'content' => "# Essential Security Practices

Security should be built into your application from day one. Let's cover the fundamentals.

## Authentication Best Practices

1. **Use Strong Password Hashing**:

```php
// Laravel automatically uses bcrypt
\$user->password = Hash::make(\$request->password);
```

2. **Implement Rate Limiting**:

```php
Route::middleware('throttle:5,1')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
});
```

## Preventing Common Attacks

### SQL Injection

Always use parameterized queries:

```php
// Safe
User::where('email', \$email)->first();

// Unsafe - NEVER do this
DB::select(\"SELECT * FROM users WHERE email = '\" . \$email . \"'\");
```

### XSS Prevention

Escape output in templates:

```blade
{{-- Safe --}}
{{ \$userInput }}

{{-- Unsafe --}}
{!! \$userInput !!}
```

### CSRF Protection

Laravel includes CSRF protection:

```html
<form method=\"POST\" action=\"/profile\">
    @csrf
    <!-- form fields -->
</form>
```

## Secure Headers

Configure security headers:

```php
// middleware
\$response->headers->set('X-Frame-Options', 'SAMEORIGIN');
\$response->headers->set('X-Content-Type-Options', 'nosniff');
\$response->headers->set('Strict-Transport-Security', 'max-age=31536000');
```

## Encryption

Encrypt sensitive data:

```php
use Illuminate\\Support\\Facades\\Crypt;

\$encrypted = Crypt::encryptString('secret data');
\$decrypted = Crypt::decryptString(\$encrypted);
```

## Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Keep dependencies updated
- [ ] Implement proper authentication
- [ ] Validate and sanitize all input
- [ ] Use secure session configuration
- [ ] Enable error logging (but hide errors from users)
- [ ] Regular security audits

Security is an ongoing commitment, not a one-time task.",
                'status' => PostStatus::PUBLISHED,
                'published_at' => now()->subDays(20),
            ],
            [
                'user' => 'sarah_dev',
                'category' => 'tutorials',
                'title' => 'Getting Started with TailwindCSS: A Practical Guide',
                'excerpt' => 'Learn how to use TailwindCSS to build beautiful, responsive user interfaces quickly and efficiently.',
                'tags' => ['tailwindcss', 'css', 'frontend-development'],
                'content' => "# Getting Started with TailwindCSS

TailwindCSS is a utility-first CSS framework that makes building custom designs faster and easier.

## Installation

Install Tailwind in your project:

```bash
npm install -D tailwindcss
npx tailwindcss init
```

## Configuration

Configure your template paths:

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Basic Usage

Use utility classes to style elements:

```html
<div class=\"container mx-auto px-4\">
  <h1 class=\"text-4xl font-bold text-gray-900 mb-4\">
    Welcome
  </h1>
  <p class=\"text-lg text-gray-600\">
    Build amazing interfaces with Tailwind
  </p>
</div>
```

## Responsive Design

Tailwind makes responsive design simple:

```html
<div class=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4\">
  <!-- Cards -->
</div>
```

## Custom Components

Extract repeated patterns:

```css
@layer components {
  .btn-primary {
    @apply bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600;
  }
}
```

## Dark Mode

Built-in dark mode support:

```html
<div class=\"bg-white dark:bg-gray-800 text-gray-900 dark:text-white\">
  Content
</div>
```

TailwindCSS helps you build faster without sacrificing flexibility!",
                'status' => PostStatus::PUBLISHED,
                'published_at' => now()->subDays(22),
            ],
            [
                'user' => 'mike_tech',
                'category' => 'career-growth',
                'title' => 'From Junior to Senior Developer: A Roadmap',
                'excerpt' => 'Practical advice and strategies for advancing your career as a software developer.',
                'tags' => ['career', 'clean-code', 'design-patterns'],
                'content' => "# From Junior to Senior Developer

Advancing your career as a developer requires more than just technical skills. Here's what you need to know.

## Technical Growth

### Master the Fundamentals

- Data structures and algorithms
- Design patterns and principles
- System design concepts
- Testing methodologies

### Specialize

Choose an area to become an expert in while maintaining broad knowledge.

## Soft Skills Matter

### Communication

Learn to explain technical concepts clearly to both technical and non-technical stakeholders.

### Mentorship

Teaching others is one of the best ways to deepen your own understanding.

### Project Management

Understand how to break down large projects, estimate work, and manage dependencies.

## Building Your Reputation

### Write Technical Content

- Blog posts
- Documentation
- Conference talks
- Open source contributions

### Network Actively

- Attend meetups and conferences
- Engage on Twitter/LinkedIn
- Join developer communities

## Taking Initiative

### Suggest Improvements

Don't just identify problems—propose solutions.

### Own Your Projects

Take responsibility for features from conception to deployment.

### Learn the Business

Understand how your code impacts the business goals.

## Continuous Learning

Technology evolves rapidly. Dedicate time each week to:
- Reading technical articles and books
- Experimenting with new technologies
- Building side projects
- Contributing to open source

## Timeline Expectations

Remember: there's no fixed timeline. Focus on consistent growth rather than arbitrary titles.

Your career is a marathon, not a sprint. Enjoy the journey!",
                'status' => PostStatus::PUBLISHED,
                'published_at' => now()->subDays(25),
            ],
            [
                'user' => 'emily_writes',
                'category' => 'web-development',
                'title' => 'Understanding JavaScript Closures and Scope',
                'excerpt' => 'Demystify one of JavaScript\'s most powerful features with clear examples and practical use cases.',
                'tags' => ['javascript', 'clean-code'],
                'content' => "# Understanding JavaScript Closures and Scope

Closures are a fundamental JavaScript concept that every developer should master.

## What is a Closure?

A closure is a function that has access to variables in its outer scope, even after the outer function has returned.

```javascript
function createCounter() {
  let count = 0;

  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

## Scope Chain

JavaScript uses lexical scoping:

```javascript
const global = 'I am global';

function outer() {
  const outerVar = 'I am outer';

  function inner() {
    const innerVar = 'I am inner';
    console.log(global);    // Accessible
    console.log(outerVar);  // Accessible
    console.log(innerVar);  // Accessible
  }

  inner();
}
```

## Practical Use Cases

### Private Variables

```javascript
function BankAccount(initialBalance) {
  let balance = initialBalance; // Private

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = BankAccount(100);
account.deposit(50); // 150
// Can't access balance directly!
```

### Event Handlers

```javascript
function setupButton(buttonId) {
  let clicks = 0;

  document.getElementById(buttonId).addEventListener('click', function() {
    clicks++;
    console.log(\`Clicked \${clicks} times\`);
  });
}
```

### Partial Application

```javascript
function multiply(a) {
  return function(b) {
    return a * b;
  };
}

const double = multiply(2);
console.log(double(5)); // 10
```

## Common Pitfalls

### Loop Problem

```javascript
// Problem
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Prints 3, 3, 3
  }, 1000);
}

// Solution 1: Use let
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Prints 0, 1, 2
  }, 1000);
}

// Solution 2: IIFE
for (var i = 0; i < 3; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i); // Prints 0, 1, 2
    }, 1000);
  })(i);
}
```

## Memory Considerations

Closures can lead to memory leaks if not handled properly. Be mindful of what variables you're closing over.

Understanding closures unlocks powerful programming patterns in JavaScript!",
                'status' => PostStatus::PUBLISHED,
                'published_at' => now()->subDays(28),
            ],
            [
                'user' => 'alex_backend',
                'category' => 'backend-engineering',
                'title' => 'Implementing Caching Strategies in Laravel',
                'excerpt' => 'Boost your application performance with effective caching strategies using Laravel\'s caching features.',
                'tags' => ['laravel', 'caching', 'redis', 'performance'],
                'content' => "# Implementing Caching Strategies in Laravel

Caching is one of the most effective ways to improve application performance. Let's explore Laravel's caching capabilities.

## Cache Drivers

Laravel supports multiple cache drivers:
- File
- Database
- Redis (recommended)
- Memcached
- Array (testing)

Configure in `config/cache.php`.

## Basic Caching

### Storing Data

```php
// Forever
Cache::forever('key', 'value');

// With expiration (seconds)
Cache::put('key', 'value', 600);

// Using helper
cache(['key' => 'value'], 600);
```

### Retrieving Data

```php
// Get value
\$value = Cache::get('key');

// With default
\$value = Cache::get('key', 'default');

// Remember pattern
\$users = Cache::remember('users.all', 3600, function () {
    return User::all();
});
```

## Eloquent Model Caching

Cache database queries:

```php
class Post extends Model
{
    public static function getAllPublished()
    {
        return Cache::remember('posts.published', 3600, function () {
            return static::where('status', 'published')
                ->with('user', 'category')
                ->latest()
                ->get();
        });
    }
}
```

## Cache Tags

Group related cache entries (Redis/Memcached only):

```php
// Store with tags
Cache::tags(['posts', 'featured'])->put('featured-posts', \$posts, 3600);

// Retrieve
\$posts = Cache::tags(['posts', 'featured'])->get('featured-posts');

// Flush tag
Cache::tags(['posts'])->flush();
```

## Cache Invalidation

### Event-Based

```php
class Post extends Model
{
    protected static function booted()
    {
        static::saved(function () {
            Cache::tags(['posts'])->flush();
        });
    }
}
```

### Manual

```php
Cache::forget('key');
Cache::tags(['posts'])->flush();
Cache::flush(); // Clear all
```

## Rate Limiting

Use cache for rate limiting:

```php
use Illuminate\\Support\\Facades\\RateLimiter;

RateLimiter::attempt(
    'send-message:' . \$user->id,
    \$perMinute = 5,
    function() {
        // Send message
    }
);
```

## Advanced Patterns

### Cache Aside

```php
\$post = Cache::get('post.' . \$id);

if (!\$post) {
    \$post = Post::find(\$id);
    Cache::put('post.' . \$id, \$post, 3600);
}
```

### Write Through

```php
public function updatePost(Post \$post, array \$data)
{
    \$post->update(\$data);
    Cache::put('post.' . \$post->id, \$post, 3600);
}
```

## Redis Specific

Use Redis commands directly:

```php
use Illuminate\\Support\\Facades\\Redis;

Redis::set('key', 'value');
Redis::get('key');
Redis::incr('counter');
```

## Best Practices

1. Cache expensive queries
2. Set appropriate TTLs
3. Use cache tags for organized invalidation
4. Monitor cache hit rates
5. Don't cache everything—measure first

## Monitoring

```php
// Check if exists
if (Cache::has('key')) {
    // ...
}

// Get and delete
\$value = Cache::pull('key');
```

Effective caching can reduce database load by 80% or more!",
                'status' => PostStatus::PUBLISHED,
                'published_at' => now()->subDays(30),
            ],
            [
                'user' => 'david_devops',
                'category' => 'devops-infrastructure',
                'title' => 'Docker Best Practices for Production',
                'excerpt' => 'Learn how to build secure, efficient Docker images and run containers in production environments.',
                'tags' => ['docker', 'devops', 'kubernetes'],
                'content' => "# Docker Best Practices for Production

Running Docker in production requires attention to security, performance, and reliability.

## Dockerfile Optimization

### Multi-Stage Builds

Reduce image size with multi-stage builds:

```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD [\"node\", \"dist/index.js\"]
```

### Layer Optimization

Order Dockerfile commands from least to most frequently changing:

```dockerfile
FROM php:8.4-fpm

# Install system dependencies (rarely changes)
RUN apt-get update && apt-get install -y \\
    git curl zip unzip

# Install PHP extensions (rarely changes)
RUN docker-php-ext-install pdo_mysql

# Copy composer files (changes occasionally)
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader

# Copy application code (changes frequently)
COPY . .
RUN composer dump-autoload --optimize
```

## Security

### Non-Root User

Never run as root:

```dockerfile
FROM node:18-alpine

# Create app user
RUN addgroup -g 1001 -S appuser && \\
    adduser -S -u 1001 -G appuser appuser

USER appuser
WORKDIR /home/appuser/app

COPY --chown=appuser:appuser . .
CMD [\"node\", \"index.js\"]
```

### Scan Images

```bash
docker scan my-image:latest
```

### Minimal Base Images

Use Alpine or distroless images:

```dockerfile
FROM gcr.io/distroless/nodejs:18
COPY --from=builder /app /app
CMD [\"/app/server\"]
```

## Health Checks

Define health checks in Dockerfile:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \\
  CMD curl -f http://localhost/ || exit 1
```

## Resource Limits

Set CPU and memory limits:

```yaml
# docker-compose.yml
services:
  app:
    image: my-app:latest
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

## Logging

Use JSON log driver:

```yaml
services:
  app:
    logging:
      driver: \"json-file\"
      options:
        max-size: \"10m\"
        max-file: \"3\"
```

## Secrets Management

Never hardcode secrets:

```bash
# Use environment variables
docker run -e DATABASE_PASSWORD=\$DB_PASSWORD my-app

# Or Docker secrets (Swarm/Kubernetes)
docker secret create db_password ./db_password.txt
```

## .dockerignore

Exclude unnecessary files:

```
node_modules
.git
.env
*.md
tests
```

## Networking

### Named Networks

```yaml
services:
  app:
    networks:
      - frontend
      - backend

  db:
    networks:
      - backend

networks:
  frontend:
  backend:
```

## Monitoring

### Container Stats

```bash
docker stats
```

### Prometheus Metrics

Expose metrics endpoint in your application.

## Production Checklist

- [ ] Use multi-stage builds
- [ ] Run as non-root user
- [ ] Set health checks
- [ ] Configure resource limits
- [ ] Implement proper logging
- [ ] Use secrets management
- [ ] Regular security scans
- [ ] Minimize image size
- [ ] Use specific image tags (not `latest`)
- [ ] Monitor container metrics

Docker makes deployments consistent, but production requires extra care!",
                'status' => PostStatus::PUBLISHED,
                'published_at' => now()->subDays(33),
            ],
            [
                'user' => 'lisa_mobile',
                'category' => 'mobile-development',
                'title' => 'State Management in React Native: Redux vs Context API',
                'excerpt' => 'Compare different state management approaches for React Native and learn when to use each.',
                'tags' => ['react-native', 'react', 'javascript'],
                'content' => "# State Management in React Native

Choosing the right state management solution is crucial for maintainable React Native apps.

## Local State (useState)

Perfect for component-specific state:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>{count}</Text>
      <Button title=\"+\" onPress={() => setCount(count + 1)} />
    </View>
  );
}
```

## Context API

Great for app-wide state without dependencies:

```jsx
// Create context
const UserContext = createContext();

// Provider
function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Navigation />
    </UserContext.Provider>
  );
}

// Consumer
function Profile() {
  const {user} = useContext(UserContext);

  return <Text>{user?.name}</Text>;
}
```

## Redux

For complex apps with lots of shared state:

```jsx
// Store
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
});

// Slice
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Component
import { useSelector, useDispatch } from 'react-redux';

function Profile() {
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();

  return (
    <View>
      <Text>{user?.name}</Text>
      <Button
        title=\"Logout\"
        onPress={() => dispatch(setUser(null))}
      />
    </View>
  );
}
```

## When to Use What

### Use useState when:
- State is local to a component
- No other components need this state
- Simple boolean flags or counters

### Use Context API when:
- State needs to be accessed by many components
- You want to avoid prop drilling
- State changes infrequently
- Small to medium apps

### Use Redux when:
- Large, complex applications
- State changes frequently
- You need time-travel debugging
- Multiple developers working on the same codebase
- Complex state logic

## Performance Considerations

### Context API

Split contexts to prevent unnecessary rerenders:

```jsx
// Bad - one context for everything
const AppContext = createContext();

// Good - separate contexts
const UserContext = createContext();
const ThemeContext = createContext();
const SettingsContext = createContext();
```

### Redux

Use selectors and memoization:

```jsx
import { createSelector } from '@reduxjs/toolkit';

const selectUserPosts = createSelector(
  state => state.posts.items,
  state => state.user.id,
  (posts, userId) => posts.filter(post => post.userId === userId)
);
```

## My Recommendation

Start with Context API. Add Redux only when you need it. Most apps don't need Redux!

Choose the simplest solution that solves your problem.",
                'status' => PostStatus::PUBLISHED,
                'published_at' => now()->subDays(35),
            ],
            [
                'user' => 'james_security',
                'category' => 'security-privacy',
                'title' => 'OAuth 2.0 and JWT: Authentication Explained',
                'excerpt' => 'Understand modern authentication mechanisms and how to implement them securely.',
                'tags' => ['security', 'authentication', 'api'],
                'content' => "# OAuth 2.0 and JWT: Authentication Explained

Modern web applications need robust authentication. Let's demystify OAuth 2.0 and JWT.

## What is OAuth 2.0?

OAuth 2.0 is an authorization framework that allows third-party applications to access user data without exposing credentials.

### OAuth Flows

#### Authorization Code Flow

Most secure for web applications:

```
1. User clicks \"Login with Google\"
2. Redirect to Google authorization page
3. User approves
4. Google redirects back with authorization code
5. Exchange code for access token
6. Use token to access user data
```

#### Implementation in Laravel

```php
// routes/web.php
Route::get('/auth/google', function () {
    return Socialite::driver('google')->redirect();
});

Route::get('/auth/google/callback', function () {
    \$user = Socialite::driver('google')->user();

    // Create or update user
    \$localUser = User::updateOrCreate(
        ['email' => \$user->email],
        [
            'name' => \$user->name,
            'google_id' => \$user->id,
        ]
    );

    Auth::login(\$localUser);

    return redirect('/dashboard');
});
```

## JSON Web Tokens (JWT)

JWTs are self-contained tokens that carry user information.

### Structure

```
header.payload.signature
```

### Example JWT

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### Creating JWTs in Laravel

```php
use Firebase\\JWT\\JWT;

\$payload = [
    'sub' => \$user->id,
    'name' => \$user->name,
    'iat' => time(),
    'exp' => time() + 3600, // 1 hour
];

\$token = JWT::encode(\$payload, config('app.jwt_secret'), 'HS256');
```

### Validating JWTs

```php
use Firebase\\JWT\\JWT;
use Firebase\\JWT\\Key;

try {
    \$decoded = JWT::decode(\$token, new Key(config('app.jwt_secret'), 'HS256'));
    \$userId = \$decoded->sub;
} catch (Exception \$e) {
    // Invalid token
}
```

## Laravel Sanctum

Laravel's built-in API authentication:

```php
// Create token
\$token = \$user->createToken('auth-token')->plainTextToken;

// Protect routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request \$request) {
        return \$request->user();
    });
});

// Revoke tokens
\$user->tokens()->delete();
```

## Security Best Practices

### Token Storage

**Never store tokens in localStorage!** Use:
- HttpOnly cookies (web)
- Secure storage APIs (mobile)

```php
// Set HttpOnly cookie
return response()->json(\$data)->cookie(
    'token',
    \$token,
    60, // minutes
    '/',
    null,
    true, // secure
    true  // httpOnly
);
```

### Token Expiration

Always set expiration:
- Access tokens: 15 minutes to 1 hour
- Refresh tokens: 7-30 days

### Refresh Tokens

```php
Route::post('/refresh', function (Request \$request) {
    \$refreshToken = \$request->cookie('refresh_token');

    // Validate refresh token
    // Generate new access token

    return response()->json([
        'access_token' => \$newAccessToken,
    ]);
});
```

### PKCE (Proof Key for Code Exchange)

Use PKCE for mobile apps:

```javascript
// Generate code verifier
const codeVerifier = generateRandomString(128);

// Generate code challenge
const codeChallenge = base64url(sha256(codeVerifier));

// Authorization request
const authUrl = `\${authEndpoint}?` +
  `client_id=\${clientId}&` +
  `redirect_uri=\${redirectUri}&` +
  `response_type=code&` +
  `code_challenge=\${codeChallenge}&` +
  `code_challenge_method=S256`;
```

## Common Vulnerabilities

1. **Token leakage**: XSS can steal tokens from localStorage
2. **Insecure storage**: Don't log tokens
3. **No expiration**: Always expire tokens
4. **Weak secrets**: Use strong, random secrets
5. **No token revocation**: Implement logout

## Testing Authentication

```php
it('requires authentication', function () {
    \$response = \$this->getJson('/api/posts');

    \$response->assertUnauthorized();
});

it('allows authenticated requests', function () {
    \$user = User::factory()->create();

    \$response = \$this->actingAs(\$user)
        ->getJson('/api/posts');

    \$response->assertOk();
});
```

Authentication is complex—use battle-tested libraries and follow security best practices!",
                'status' => PostStatus::PUBLISHED,
                'published_at' => now()->subDays(38),
            ],
        ];

        foreach ($posts as $postData) {
            $user = $users->where('username', $postData['user'])->first();
            $category = $categories->where('slug', $postData['category'])->first();
            $image = Image::factory()->create();

            $post = Post::query()->create([
                'user_id' => $user->id,
                'category_id' => $category->id,
                'image_id' => $image->id,
                'title' => $postData['title'],
                'slug' => Str::slug($postData['title']),
                'excerpt' => $postData['excerpt'],
                'content' => $postData['content'],
                'status' => $postData['status'],
                'published_at' => $postData['published_at'],
            ]);

            // Attach tags
            $tagIds = Tag::query()->whereIn('name', $postData['tags'])->pluck('id');
            $post->tags()->attach($tagIds);

            // Add some likes (random users)
            $likerIds = $users->random(rand(2, 6))->pluck('id');
            $post->likes()->attach($likerIds);

            // Add some bookmarks (random users)
            $bookmarkerIds = $users->random(rand(1, 3))->pluck('id');
            $post->bookmarks()->attach($bookmarkerIds);
        }
    }
}
