FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql

COPY --from=composer:2.5 /usr/bin/composer /usr/bin/composer

RUN useradd -u 1000 -m dockeruser && \
    chown -R dockeruser:dockeruser /var/www/html

USER dockeruser

WORKDIR /var/www/html

COPY . .

EXPOSE 80

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]
