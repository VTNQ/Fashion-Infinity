FROM php:8.2-fpm

# Cài các package hệ thống
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    curl \
    git \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath zip

# Cài Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Làm việc tại thư mục app
WORKDIR /var/www

# Copy source code
COPY . .

# Cài đặt Laravel
RUN composer install --no-interaction

# Mở port Laravel (nếu dùng `php artisan serve`)
CMD php artisan serve --host=0.0.0.0 --port=8000
