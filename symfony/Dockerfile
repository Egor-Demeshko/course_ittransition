FROM php:8.2-fpm

# update packeges
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN apt-get update && apt-get upgrade -y

# Установите необходимые инструменты
RUN apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_mysql

RUN curl -sSLo composer-setup.php https://getcomposer.org/installer && \
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer && \
    rm composer-setup.php


WORKDIR /app

COPY . .

RUN composer install
