FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN useradd -u 1000 -m dockeruser && \
    chown -R dockeruser:dockeruser /var/www/html

USER dockeruser

WORKDIR /var/www/html

COPY . .

EXPOSE 8000
