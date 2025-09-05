FROM php:8.0-fpm

WORKDIR /var/www/html

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg-dev \
    libpng-dev \
    libzip-dev \
    libxml2-dev \
    libonig-dev \
    chromium \
    fonts-freefont-ttf \
    nodejs \
    npm \
    protobuf-compiler \
    libssl-dev \
    pkg-config \
    build-essential \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql zip bcmath xml mbstring \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin --filename=composer

ARG WWWUSER=1000
ARG WWWGROUP=1000

RUN groupadd --force -g $WWWGROUP sail \
    && useradd -ms /bin/bash --no-user-group -g $WWWGROUP -u $WWWUSER sail
    
USER sail

# Expose port 9000 for PHP-FPM
EXPOSE 9000

CMD ["php-fpm"]