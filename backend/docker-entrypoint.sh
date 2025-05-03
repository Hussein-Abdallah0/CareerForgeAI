#!/bin/bash

# Install MySQL client (if not already in your Dockerfile)
apt-get update && apt-get install -y default-mysql-client

echo 'Waiting for MySQL to be ready...'
while ! mysqladmin ping -h mysql -u root -p12345 --silent; do
  sleep 5
done

echo 'MySQL is ready!'

# Create .env if not exists
if [ ! -f .env ]; then
  cp .env.example .env
  php artisan key:generate
fi

# Run migrations and optimize
php artisan migrate --force
php artisan optimize

# Fix permissions
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache

echo 'Starting Apache...'
exec apache2-foreground